let top3 = []; // 데이터를 저장할 변수를 let으로 선언

export async function fetchTop3Data() {
    try {
        const response = await fetch('https://127.0.0.1:8000/api/game-rankings'); // 로컬 JSON 파일 경로 또는 서버 URL 사용
        if (!response.ok) throw new Error('네트워크 응답 오류');
        console.log('fetchTop3Data done!' ); // 데이터 확인용 로그

        top3 = await response.json();

        // 전체 데이터 구조 확인
        console.log("전체 TOP3 데이터:", top3);
        
        // 특정 키에 접근하여 데이터 확인
        // console.log("2D 1vs1 TOP3:", top3["2d-1vs1-top3"]);
        // console.log("3D 1vs1 TOP3:", top3["3d-1vs1-top3"]);
        // console.log("2D tour TOP3:", top3["2d-tournament-top3"]);
        // console.log("3D tour TOP3:", top3["3d-tournament-top3"]);

        modes.forEach(mode => updateLeaderboard(mode.modeKey, mode.modeIndex, mode.id));
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
}

const container = document.createElement("div");
container.classList.add("leaderboard-container");

const modes = [
    { title: "2D 1vs1", id: "leaderboard-list1", modeKey: "2d-1vs1-top3", modeIndex: 0 },
    { title: "2D 1vs1vs1vs1", id: "leaderboard-list2", modeKey: "2d-tournament-top3", modeIndex: 1 },
    { title: "3D 1vs1", id: "leaderboard-list3", modeKey: "3d-1vs1-top3", modeIndex: 2 },
    { title: "3D 1vs1vs1vs1", id: "leaderboard-list4", modeKey: "3d-tournament-top3", modeIndex: 3 }
];

modes.forEach(mode => {
    const leaderboard = document.createElement("div");
    leaderboard.classList.add("leaderboard");

    leaderboard.innerHTML = `
        <h2 class="title-text">${mode.title}</h2>
        <div class="header-row">
            <span class="rank-field">rank</span>
            <span class="black-field"></span>
            <span class="name-field">id</span>
            <span class="black-field"></span>
            <span class="score-field">win</span>
        </div>
        <div class="leaderboard-list" id="${mode.id}"></div>
    `;

    container.appendChild(leaderboard);
});

document.body.appendChild(container);

function updateLeaderboard(modeKey, modeIndex, listId) {
    const leaderboardList = document.getElementById(listId);
    leaderboardList.innerHTML = ''; // 기존 목록 초기화

    const modeData = top3[modeKey];

    let i = 1;
    modeData.forEach((data) => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        playerDiv.innerHTML = `
            <span class="rank-field">${i++}</span>
            <span class="black-field"></span>
            <span class="name-field">${data['name']}</span>
            <span class="black-field"></span>
            <span class="score-field">${data['win_count']}</span>`;
        leaderboardList.appendChild(playerDiv);  
    });
}


export function showLeaderboard() {
    container.style.display = '';
}

// 리더보드를 숨기는 함수
export function hideLeaderboard() {
    container.style.display = 'none';
}