// 금융 성향 진단 질문 데이터 (12개)
export const questions = [
    {
        id: 1,
        content: '월급이 들어왔을 때 가장 먼저 하는 행동은?',
        options: [
            { value: 1, label: '즉시 저축/투자 계좌로 이체', weights: { spending: -10, risk: 5, social: 0 } },
            { value: 2, label: '생활비만 남기고 나머지 저축', weights: { spending: -5, risk: 3, social: 0 } },
            { value: 3, label: '필요한 것부터 사고 남은 돈 저축', weights: { spending: 5, risk: 0, social: 0 } },
            { value: 4, label: '그냥 통장에 두고 쓰고 싶을 때 쓴다', weights: { spending: 10, risk: -5, social: 0 } }
        ]
    },
    {
        id: 2,
        content: '친구들과 밥을 먹을 때 계산은?',
        options: [
            { value: 1, label: '무조건 더치페이! 정확하게 나눈다', weights: { spending: -5, risk: 0, social: -10 } },
            { value: 2, label: '대충 나눠서 낸다', weights: { spending: 0, risk: 0, social: 0 } },
            { value: 3, label: '가끔 내가 쏜다', weights: { spending: 5, risk: 0, social: 5 } },
            { value: 4, label: '"내가 쏠게!" 자주 말한다', weights: { spending: 10, risk: 0, social: 10 } }
        ]
    },
    {
        id: 3,
        content: '스트레스를 받았을 때 당신의 행동은?',
        options: [
            { value: 1, label: '운동하거나 산책한다 (무료)', weights: { spending: -10, risk: 0, social: 0 } },
            { value: 2, label: '친구 만나서 수다 떤다', weights: { spending: 0, risk: 0, social: 5 } },
            { value: 3, label: '맛있는 거 먹거나 쇼핑한다', weights: { spending: 10, risk: 0, social: 0 } },
            { value: 4, label: '배달앱 켜고 카트에 담는다', weights: { spending: 15, risk: 0, social: 0 } }
        ]
    },
    {
        id: 4,
        content: '갑자기 100만원이 생긴다면?',
        options: [
            { value: 1, label: '전액 예금/적금에 넣는다', weights: { spending: -10, risk: -10, social: 0 } },
            { value: 2, label: '70만원 저축, 30만원 소비', weights: { spending: 0, risk: 0, social: 0 } },
            { value: 3, label: '50만원 저축, 50만원 소비', weights: { spending: 5, risk: 0, social: 0 } },
            { value: 4, label: '주식/코인에 투자한다', weights: { spending: 0, risk: 15, social: 0 } }
        ]
    },
    {
        id: 5,
        content: '투자 상품을 고를 때 가장 중요한 기준은?',
        options: [
            { value: 1, label: '원금 보장이 최우선', weights: { spending: 0, risk: -15, social: 0 } },
            { value: 2, label: '안정적인 수익률', weights: { spending: 0, risk: -5, social: 0 } },
            { value: 3, label: '적당한 위험, 적당한 수익', weights: { spending: 0, risk: 5, social: 0 } },
            { value: 4, label: '고위험 고수익! 대박 노린다', weights: { spending: 0, risk: 15, social: 0 } }
        ]
    },
    {
        id: 6,
        content: '온라인 쇼핑몰에서 장바구니에 담은 물건은?',
        options: [
            { value: 1, label: '며칠 고민 후 필요한 것만 구매', weights: { spending: -10, risk: 0, social: 0 } },
            { value: 2, label: '할인 쿠폰 있을 때 구매', weights: { spending: -5, risk: 0, social: 0 } },
            { value: 3, label: '그날 기분에 따라 구매', weights: { spending: 10, risk: 0, social: 0 } },
            { value: 4, label: '담으면 바로 결제', weights: { spending: 15, risk: 0, social: 0 } }
        ]
    },
    {
        id: 7,
        content: '가계부 작성에 대한 당신의 생각은?',
        options: [
            { value: 1, label: '매일 꼼꼼하게 기록한다', weights: { spending: -10, risk: 0, social: 0 } },
            { value: 2, label: '일주일에 한 번 정도 정리', weights: { spending: -5, risk: 0, social: 0 } },
            { value: 3, label: '가끔 확인하는 편', weights: { spending: 5, risk: 0, social: 0 } },
            { value: 4, label: '가계부? 그게 뭐죠?', weights: { spending: 10, risk: 0, social: 0 } }
        ]
    },
    {
        id: 8,
        content: '새로운 투자 트렌드(NFT, 코인 등)에 대한 반응은?',
        options: [
            { value: 1, label: '관심 없다. 안전한 게 최고', weights: { spending: 0, risk: -10, social: 0 } },
            { value: 2, label: '지켜보다가 안정되면 투자', weights: { spending: 0, risk: 0, social: 0 } },
            { value: 3, label: '주변에서 하면 나도 해본다', weights: { spending: 0, risk: 5, social: 10 } },
            { value: 4, label: '바로 뛰어든다! 선점이 중요', weights: { spending: 0, risk: 15, social: 5 } }
        ]
    },
    {
        id: 9,
        content: '친구 생일 선물 예산은?',
        options: [
            { value: 1, label: '1만원 이하로 마음만', weights: { spending: -10, risk: 0, social: -5 } },
            { value: 2, label: '2~3만원 정도', weights: { spending: 0, risk: 0, social: 0 } },
            { value: 3, label: '5만원 이상 제대로', weights: { spending: 10, risk: 0, social: 10 } },
            { value: 4, label: '친한 정도에 따라 다르지만 아끼지 않는다', weights: { spending: 5, risk: 0, social: 15 } }
        ]
    },
    {
        id: 10,
        content: '통장 잔고를 확인하는 빈도는?',
        options: [
            { value: 1, label: '하루에 여러 번 확인', weights: { spending: -10, risk: 0, social: 0 } },
            { value: 2, label: '일주일에 2~3번', weights: { spending: -5, risk: 0, social: 0 } },
            { value: 3, label: '한 달에 몇 번', weights: { spending: 5, risk: 0, social: 0 } },
            { value: 4, label: '거의 확인 안 함', weights: { spending: 10, risk: 0, social: 0 } }
        ]
    },
    {
        id: 11,
        content: '할인/세일 정보에 대한 반응은?',
        options: [
            { value: 1, label: '앱 알림 켜놓고 적극 활용', weights: { spending: -10, risk: 0, social: 0 } },
            { value: 2, label: '필요한 것만 할인할 때 구매', weights: { spending: -5, risk: 0, social: 0 } },
            { value: 3, label: '가끔 충동구매 한다', weights: { spending: 10, risk: 0, social: 0 } },
            { value: 4, label: '할인이든 아니든 사고 싶으면 산다', weights: { spending: 15, risk: 0, social: 0 } }
        ]
    },
    {
        id: 12,
        content: '재테크 공부에 대한 당신의 태도는?',
        options: [
            { value: 1, label: '책, 유튜브로 열심히 공부', weights: { spending: -5, risk: 5, social: 0 } },
            { value: 2, label: '필요할 때만 찾아본다', weights: { spending: 0, risk: 0, social: 0 } },
            { value: 3, label: '친구 추천 따라간다', weights: { spending: 0, risk: 0, social: 10 } },
            { value: 4, label: '너무 복잡해서 관심 없다', weights: { spending: 5, risk: -10, social: 0 } }
        ]
    }
];

// 총 질문 개수
export const getTotalQuestions = () => questions.length;

// 특정 질문 가져오기
export const getQuestionById = (id) => {
    return questions.find(q => q.id === id);
};
