import { personas } from '../data/personas';

// 답변으로부터 3가지 축 점수 계산
export const calculateScores = (answers) => {
    let spendingScore = 50; // 기본 50점에서 시작
    let riskScore = 50;
    let socialScore = 50;

    // 각 답변의 가중치를 합산
    answers.forEach(answer => {
        const { weights } = answer;
        spendingScore += weights.spending;
        riskScore += weights.risk;
        socialScore += weights.social;
    });

    // 0~100 범위로 정규화
    spendingScore = Math.max(0, Math.min(100, spendingScore));
    riskScore = Math.max(0, Math.min(100, riskScore));
    socialScore = Math.max(0, Math.min(100, socialScore));

    return {
        spending: Math.round(spendingScore),
        risk: Math.round(riskScore),
        social: Math.round(socialScore)
    };
};

// 점수로 페르소나 매칭
export const matchPersona = (scores) => {
    const { spending, risk, social } = scores;

    // 우선순위 기반 매칭 로직
    // 1. 극단적인 위험 성향 체크
    if (risk >= 70 && spending <= 50) {
        return personas.find(p => p.id === 2); // 불나방 투자자
    }

    if (risk <= 30 && spending <= 30) {
        return personas.find(p => p.id === 1); // 인간 다람쥐
    }

    // 2. 소비 성향 체크
    if (spending >= 70) {
        if (social >= 70) {
            return personas.find(p => p.id === 4); // 술자리 산타클로스
        } else if (social <= 50) {
            if (risk >= 50) {
                return personas.find(p => p.id === 7); // 유행 따라 힙스터
            } else {
                return personas.find(p => p.id === 3); // 걸어 다니는 ATM
            }
        }
    }

    // 3. 계획성 체크
    if (spending <= 40 && risk >= 30 && risk <= 70) {
        return personas.find(p => p.id === 5); // 인간 엑셀
    }

    // 4. 방관형 체크
    if (spending <= 50 && risk <= 30 && social <= 50) {
        return personas.find(p => p.id === 6); // 잠자는 숲속의 예금
    }

    // 5. 가치소비형 체크
    if (spending >= 50 && social <= 50) {
        return personas.find(p => p.id === 8); // 혼밥의 미식가
    }

    // 기본값: 가장 가까운 페르소나 찾기
    let closestPersona = personas[0];
    let minDistance = Infinity;

    personas.forEach(persona => {
        const { scoreRange } = persona;
        const midSpending = (scoreRange.spending[0] + scoreRange.spending[1]) / 2;
        const midRisk = (scoreRange.risk[0] + scoreRange.risk[1]) / 2;
        const midSocial = (scoreRange.social[0] + scoreRange.social[1]) / 2;

        const distance = Math.sqrt(
            Math.pow(spending - midSpending, 2) +
            Math.pow(risk - midRisk, 2) +
            Math.pow(social - midSocial, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestPersona = persona;
        }
    });

    return closestPersona;
};

// 상대적 순위 계산 (Mock - 실제로는 백엔드에서 통계 데이터 필요)
export const calculateRank = (personaId) => {
    // Mock 데이터: 각 페르소나의 희소성
    const rarityMap = {
        1: 15, // 인간 다람쥐 - 상위 15%
        2: 8,  // 불나방 투자자 - 상위 8%
        3: 25, // 걸어 다니는 ATM - 상위 25%
        4: 12, // 술자리 산타클로스 - 상위 12%
        5: 5,  // 인간 엑셀 - 상위 5%
        6: 30, // 잠자는 숲속의 예금 - 상위 30%
        7: 18, // 유행 따라 힙스터 - 상위 18%
        8: 10  // 혼밥의 미식가 - 상위 10%
    };

    return rarityMap[personaId] || 20;
};

// 레이더 차트용 데이터 변환
export const getRadarChartData = (scores) => {
    return [
        { axis: '소비성향', value: scores.spending },
        { axis: '위험감수', value: scores.risk },
        { axis: '관계지향', value: scores.social }
    ];
};
