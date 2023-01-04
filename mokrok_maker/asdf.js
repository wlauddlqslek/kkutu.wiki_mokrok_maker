window.onload = function () {

    // words 중복 제거 & 가나다순 정렬
    function updatewords() {
        words = [...new Set([...wordsorigin, ...wordsnew])]
        .filter(a => a !== '' && !wordsdelete.includes(a))
        .sort();
    }
    // juje 가져오기
    function updatejuje() {
        var a = inputdocument.value.match(/(?<=:).+(?=\]\]\[)/);
        var b = inputjuje.value;

        juje = !a ? b : b ? b : a;
        juje2 = juje == '분홍꽃' ? '분홍꽃(주제)' : juje;
        juje3 = juje == '분홍꽃' ? '분홍꽃(주제)|분홍꽃' : juje;
    }
    // 목록 업데이트
    function updatemokrok() {
        origin();
        jujejunche();
        jujegim();
        jujemission();
    }
    // 단어 원본 목록 만들기
    function origin() {
        showorigin.value = words.join("\n");
    }
    // 주제 전체 단어 목록 만들기
    function jujejunche() {
        let w = words;
        let len = w.length;
        let j = juje;
        const J = JUJE;

        if (!len || !j) {
            showjujejunche.value = "";
            return;
        };

        var b = {};

        for (let i = 0; i < len; i++) {
            var c = w[i];
            var d = c.charAt();

            if (b[d]) {
                b[d].push(`|-\n| ${c.length} || [[${J.includes(c) ? `${c}(단어)|${c}` : c}]]`);
            } else {
                b[d] = [`|-\n| ${c.length} || [[${J.includes(c) ? `${c}(단어)|${c}` : c}]]`];
            };
        };

        var f = Object.keys(b)
        .map(a => `=== ${a} ===\n{| class="wikitable sortable" style="text-align: center;"\n! width="50" | 길이 !! 단어\n${b[a].join("\n")}\n|}`)
        .join("\n\n");

        showjujejunche.value = `[[분류:${j}]][[분류:전체 단어 목록]]\n{{상위 문서|${juje2}}}\n{{목차}}\n== 개요 ==\n[[${juje3}]] 주제의 전체 단어 목록이다.\n\n== 목록 ==\n\n${f}`;
    }
    // 주제 긴 단어 목록 만들기
    function jujegim() {
        let a = words.filter(a => a.length >= 9);
        let j = juje;

        if (!a.length || !j) {
            showjujegim.value = "";
            return;
        };

        let b = a
        .sort((a, b) => b.length - a.length)
        .map(a => `|-\n| ${a.length} || [[${JUJE.includes(a) ? `${a}}(단어)|${a}` : a}]]`)
        .join("\n");

        showjujegim.value = `[[분류:${j}]][[분류:긴 단어 목록]]\n{{상위 문서|${juje2}}}\n== 개요 ==\n[[${juje3}]] 주제의 긴 단어 목록이다.\n\n== 목록 ==\n{| class="wikitable sortable" style="text-align: center;"\n! width="50" | 길이 !! 단어\n${b}\n|}`
    }
    // 주제 미션 단어 목록 만들기
    function jujemission() {
        let w = words.sort((a, b) => b.length - a.length);
        let len = w.length;
        let j = juje;
        const J = JUJE;
        const M = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'];

        if (!len || !j) {
            showjujemission.value = "";
            return;
        };

        let b = {
            '가': [],
            '나': [],
            '다': [],
            '라': [],
            '마': [],
            '바': [],
            '사': [],
            '아': [],
            '자': [],
            '차': [],
            '카': [],
            '타': [],
            '파': [],
            '하': []
        };
        let g = {
            '가': [],
            '나': [],
            '다': [],
            '라': [],
            '마': [],
            '바': [],
            '사': [],
            '아': [],
            '자': [],
            '차': [],
            '카': [],
            '타': [],
            '파': [],
            '하': []
        };

        for (let i = 0; i < len; i++) {
            let c = w[i];
            let clen = c.length;
            for (let i2 = 0; i2 < 14; i2++) {
                let d = M[i2];
                let e = 0;
                for (let i3 = 0; i3 < clen; i3++) {
                    if (c[i3] == d) e++;
                };
                if (e >= 2) {
                    b[d].push(`|-\n| ${clen} || [[${J.includes(c) ? `${c}(단어)|${c}` : c}]] || ${e}`);
                    g[d].push(e);
                };
            };
        };

        var f = Object.keys(b)
        .map(a => `=== ${a} ===\n{| class="wikitable sortable" style="text-align: center;"\n! width="50" | 길이 !! 단어 !! width="50" | 미션\n${b[a].sort((m, n) => g[a][b[a].indexOf(n)] - g[a][b[a].indexOf(m)]).join("\n")}\n|}`)
        .join("\n\n");

        showjujemission.value = `[[분류:${j}]][[분류:미션 단어 목록]]\n{{상위 문서|${juje2}}}\n{{목차}}\n== 개요 ==\n[[${juje3}]] 주제의 미션 단어 목록이다.\n\n== 목록 ==\n\n${f}`;
    }

    const inputdocument = document.getElementById("inputdocument");
    const inputaddwords = document.getElementById("inputaddwords");
    const inputdeletewords = document.getElementById("inputdeletewords");
    const inputjuje = document.getElementById("inputjuje");
    const showorigin = document.getElementById("showorigin");
    const showjujejunche = document.getElementById("showjujejunche");
    const showjujegim = document.getElementById("showjujegim");
    const showjujemission = document.getElementById("showjujemission");
    const copyorigin = document.getElementById("copyorigin");
    const copyjujejunche = document.getElementById("copyjujejunche");
    const copyjujegim = document.getElementById("copyjujegim");
    const copyjujemission = document.getElementById("copyjujemission");

    const JUJE = [
        '대문',
        '분끄위키',
        '파일올리기',
        '토론장',
        '주제',
        '경제',
        '고적',
        '공업',
        '교육',
        '교통',
        '농업',
        '문학',
        '물리',
        '미술',
        '동물',
        '사회',
        '생물',
        '수학',
        '식물',
        '언어',
        '역사',
        '운동',
        '음악',
        '지리',
        '지명',
        '천문',
        '컴퓨터',
        '화학',
        '가톨릭',
        '건설',
        '고유',
        '광업',
        '군사',
        '기계',
        '기독교',
        '논리',
        '민속',
        '법률',
        '불교',
        '수산',
        '수공',
        '심리',
        '약학',
        '언론',
        '연영',
        '예술',
        '의학',
        '인명',
        '전기',
        '정치',
        '종교',
        '책명',
        '철학',
        '출판',
        '통신',
        '한의학',
        '항공',
        '해양',
        '디지몬',
        '요괴워치',
        '포켓몬스터',
        '니세코이',
        '도라에몽',
        '빙과',
        '오레이모',
        '원피스',
        '유루유리',
        '간식',
        '게임',
        '기업',
        '뮤지컬',
        '속담',
        '신조어',
        '유명인',
        '직업',
        '캐릭터',
        '학교',
        '공항',
        '마인크래프트',
        '메이플스토리',
        '모두의마블',
        '분홍꽃',
        '브롤스타즈',
        '사이퍼즈',
        '세븐나이츠',
        '스타크래프트',
        '엘소드',
        '오버워치',
        '원신',
        '좀비고등학교',
        '카트라이더',
        '쿠키런',
        '테일즈런너',
        '하스스톤',
        '소설',
        '에세이',
        '웹툰',
        '감정',
        '날씨',
        '사람',
        '음식',
        '인체',
        '분홍봇',
        '용어',
        '아이템',
    ];

    let words = [];
    let wordsorigin = [];
    let wordsnew = [];
    let wordsdelete = [];
    let juje = '';
    let juje2 = '';
    let juje3 = '';

    inputdocument.onkeyup = function () {
        var a = inputdocument.value.match(/(?<=\| \[\[).+(?=\]\])/g);

        wordsorigin = a
        ? a.map(a => a.includes('(단어)') ? a.substr(0, a.indexOf('(단어)')) : a)
        : [];

        updatewords();
        updatejuje();
        updatemokrok();
    };
    inputaddwords.onkeyup = function () {
        wordsnew = inputaddwords.value.split("\n");

        updatewords();
        updatemokrok();
    };
    inputdeletewords.onkeyup = function () {
        wordsdelete = inputdeletewords.value.split("\n");

        updatewords();
        updatemokrok();
    };
    inputjuje.onkeyup = function () {
        updatejuje();
        updatemokrok();
    };
    copyorigin.onclick = function () {
        showorigin.select();
        document.execCommand('copy');
    };
    copyjujejunche.onclick = function () {
        showjujejunche.select();
        document.execCommand('copy');
    };
    copyjujegim.onclick = function () {
        showjujegim.select();
        document.execCommand('copy');
    };
    copyjujemission.onclick = function () {
        showjujemission.select();
        document.execCommand('copy');
    };

    console.log(
`$##################################@@@@@@#=;:~~~~~~-------------~!$@@@@@@@@@#######################$
$#################################@@@@@@#=;:~~~~~~---------------~;=#@@@@@@@@######################$
$#################################@@@@@@$!::~~~~~-----------------~:!$@@@@@@@######################$
$#################################@@@@@#*;:~~~~~~-----------------~~~;$@@@@@@######################$
$################################@@@@@@$!::~~~~~--------------------~~!#@@@@@######################$
$################################@@@@@#*;::::~~----------------------~:=#@@@@######################$
$################################@@@@#=*!;::::;:~--------------------~~!#@@@@@#####################$
$###############################@@@@@$=!;::::~~~;:--------------------~;$@@@@@#####################$
$################################@@@$=*;;;;;;!;:~::-------------~~~~~~~:*#@@@@#####################$
$##############################@@@@#==!;;;;:!$$=*;;:~--------~~:::::::::;#@@@@#####################$
$##############################@@@$===;;;;:~:!*=$*!!:------~:::~:~~~~~:;!=@@@@#####################$
$#############################@@@#=;$!;;;;:::::;!;;;;~~~~~~:;;!;;;:;!:~;==@@@@#####################$
$#############################@@@@$*=;;!!!!!::::::::!::~~::;;!;;;;:;!!::=$#@@@#####################$
$#############################@@@#=**;;;!**=$=**!;::;~~~~~;:;;::::~~~~::!$#@#######################$
$@#########################@##@@@$*!;:::::;;!*=*=!;:;~~~~::::;;::::~:~~~;$$@######################@#
$@@########################@@@@@#$!;:~~~~~~::::;!*;:;~~~~:;:;!****!!;;::;$=$#@############@@#####@@#
$##########################@@@@@#=;::~~--~~~~~~::::;:~--~:::!$#$$===*!;::=!;=#############@@@@@@@@@#
#@@########################@@@@@#*:::~------~~~~~::;~~~~~:::;;;;;:::::~~:!*$#@############@@@@@@@@@#
#@@########################@@@@@$!:::~--------~~~~:~~~-~~::~~:::::~~~~~~::!$#@############@@@@@@@@@#
#@@#########################@@@@=;:~~~~---------~:~-----~~:~~~~~~~~~~---~~:*#@#############@@@@@@@@#
#@@@@######################@@@@@*;:~--~:-~-----~:~--~---~~::~~~~~--------~~;##############@@@@@@@@@#
#@@@@######################@@#@#*;~~--,-:~~~~~~:~-~~~----~~::~~~--------~~-:#######################$
#@@@@@##########@@#####@@##@@@@#!;:~---,--~~~~~--~~~~----~~~:~~--------~~--~$######################$
#@@@@@########@@@@@###@@@@@@@@@#!;:~---,,-------~~~~~----~~::::-----~~~----~$######################$
#@@@@@######@@@@@@@@@@@@@@@@@@@$!;:~~---------~~:~-~~--,--~::~:;::~~:~-,--~:$######################$
#@@@@@@##@@@@@@@@@@@@@@@@@@@@@@$!;::~~------~~~::------,----::~~~~~--,,---~:#######################$
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$!;;:~~~~~~~~::~::~--~~------~;:~-----,,---~;#######################$
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$;;;::~~~~~:;:~~~::;;::~~~~~~~:;:~~-------~:*#######################$
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$;;;;::::::;:~~~~~:::::::;;;:~~:;:~~------~:=#######################$
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$;;;;:::::::::~~~~~~~~~~-~~~-~~::;:~~~~~~~:;$#######################$
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#;::::::~~~:;!;:~~~-----------~::;::~~~~~::!########################$
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!:::::~~~~:;*!;::~~~~--------~:;;;::::::;;!##@#####################$
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=;:::::~~~~~:!;;;::::~~~~~~~:;;;;::::::;;;*@@@@####################$
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#=;:::::~~~~~~:;!:::~~:~::::;==!;:::::::;:;$@@@@@@@#@@@@@@@@@@@@@@@#$
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@#=*!;:::::~~~~~~::;:;:~~~-~~~:!!;:::~~~:::::!#@@@@@@@@@@@@@@@@@@@@@@@#$
#@@@@@@@@@@@@@@@@@@@@@@@@@@#*!!!!!;:::~~~~~~~~::~~~~::~:::::~~~:~~~~~::::=@@@@@@@@@@@@@@@@@@@@@@@@#$
#@@@@@@@@@@@@@@@@@@@@@@@@#*;;:;!!!;:::~~~~~~~~~::~------~~~~~-~:~-~~~:::~;$###@@@@@@@@@@@@#$@@@@@@#$
#@@@@@@@@@@@@@@@@@@@@@@#*;:::~:;;::::::~~~~~~~~~:~~-----~~~~--~~~-~~~:::~~~;!*=$#@@@@@@@@$**=#@@@@#$
#@@@@@@@@@@@@@@@@@@@@@$!:~~~~~~~::~~:::~~~~~~-~~~~~~~---~~~---~~~~~~~::~-~-~;;::;=@@@@@@$!;;!=#@@@#$
#@@@@@@@@@@@@@@@@@@@$!:~~~~~~~~~::~~:::::~~~~---~~~~~~~~------~~~~~~::~---~~:;::~:#@@@@$*;:::!=@@@#=
#@@@@@@@@@@@@@@@@#$!;~~~~-~~~~~~~~~~:;:::::~~-----------------~~~~~::~----~~~:::--*@@@#*;:~~:;*#@@#=
#@@@@@@@@@@@@@@#=!;:~~~:~--~~~~~~~~~:!;::::~~~----------------~~~~::~------~~~::--~=$$*!:~~~~:!#@@#=
#@@@@@@@@@@@@#=!:~~--~~:~~~~~~~~~~-~~!;:::::~~------,,,-------~~~::~-------~~~::-,-~:::~~---~:!$@@#*
#@@@@@@@@@@@$;~~-------~:~~~~~~~~---~!!;::::~~~----,,,,,-----~~~::------,,-~~~::-,------~---~~!$@#$*
#@@@@@@@@@#!~--~-------~~~-~~~~~~---~!!;;::::~~---,,-,,,----~~~::-,----,,,-~~~::-,----~~~---~:!#@#=!
#@@@@@@@#*:~--~---------~~-~~-~~~---~;!;;::::~~~------------~~::-,,---,,,,-~~~:~-----~:~---,-:!##$*;
#@@@@@@$;~~~--------,---~---~~~~-----:!;::::::~~~---------~~:::-,,,,--,,,,--~~~~,----::~-----:!$#=!:
#@@@@@=:-~~-------,,,,---------------:!;:::::::~~~~~----~~~::::-,,,,,-,,,,--~~~-,,--~::~-----~;*=!:~
#@@@#*~-~~-------,,,,,-,-------------~;!;:::::::~~~~~~~~~::::;:-,,,,,-,,,--~~~~~,,-~~~~~~-----~;!;:~
#@#=;--~-------,,,,,,,-,--,----------~:!;:::::::::::::::::::;;~,,,,,,-,,,,-~~~~~,,-~~~~~~---,,-:;;:~
$*;~-~~-------,,,,,,,,-,,-,,----------:;;;:::::::::::::::::;;:-,,,,,,-,,,,--~~~~,,-~~~~~~---,,-~:;:~
:~---~-------,,,,,,,,,-,,-,,----------~:;;::~:::::::::::::;;;~-,,,,,,--,,,--~~~~,,,-~~~~~--,,,-~:::~`
    );
}