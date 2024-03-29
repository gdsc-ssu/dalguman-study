// 기본값
let KEYWORDS = ['협찬', '내돈내산', '제공'];
let HIGHLIGHT_COLOR = 'yellow';

// 검색 결과 요소(선택자)
let outerSelectors = {
  google: {
    searchSelector: '#search .g .yuRUbf > a',
    targetSelector: 'h3.LC20lb',
  },
  naver: {
    searchSelector: '.sp_nreview panel-list > ._panel div.total_area > a',
    targetSelector: '',
  },
};

// 페이지의 본문 요소(선택자)
let innerSelector = {
  naver: 'div.se-main-container > p',
  tistory: 'div.contents_style > p',
  daum: '.tt_article_useless_p_margin > p',
  etc: 'p',
};

// 현재 링크 파악 함수
let separateSite = (url) => {
  if (url.includes('google')) {
    return 'google';
  } else if (url.includes('naver')) {
    return 'naver';
  } else {
    return null;
  }
};

// 링크, 타겟을 포함한 객체 반환 함수
let makeList = (searchSelector, targetSelector) => {
  const searchList = document.querySelectorAll(searchSelector);
  const uniqList = new Set([...searchList]);

  const result = [...uniqList].map((item) => {
    return {
      link: item.href, // 분석할 링크
      target: targetSelector ? item.querySelector(targetSelector) : item, // 하이라이트 할 요소
    };
  });

  return result;
};

// 검색 페이지에서의 최종 반환 함수
let makeSearchList = () => {
  const currentURL = window.location.href;
  const site = separateSite(currentURL);
  if (site) {
    const res = makeList(
      outerSelectors[site].searchSelector,
      outerSelectors[site].targetSelector
    );
    return res;
  }
};

// url에 들어가 키워드 포함 여부 및 배열 반환 함수
let getHtml = async (url) => {
  try {
    // 개인 배포한 프록시 서버 (주의 요함)
    const proxy = 'https://kh-proxy.herokuapp.com/';
    const proxyUrl = proxy + url;

    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
      },
    });

    const text = await response.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(text, 'text/html');

    //사이트 별로 파싱 방법 나누기.
    let nodeList = [];
    if (url.includes('daum')) {
      nodeList = doc.querySelectorAll(innerSelector.daum);
    } else if (url.includes('naver')) {
      nodeList = doc.querySelectorAll(innerSelector.naver);
    } else if (url.includes('tistory')) {
      nodeList = doc.querySelectorAll(innerSelector.tistory);
    } else {
      nodeList = doc.querySelectorAll(innerSelector.etc);
    }

    // 본문 글 불러오기.
    // 공백 제거 방법 논의해야함.
    let keyExist = false;
    let keySentences = [];

    const contents = [...nodeList]
      .map((node) => node.textContent)
      .filter(function (text) {
        return text !== '';
      });

    for (let p in contents) {
      for (var i = 0; i < KEYWORDS.length; i++) {
        if (contents[p].includes(KEYWORDS[i])) {
          keyExist = true;
          keySentences.push(contents[p]);
        }
      }
    }

    return { keyExist, keySentences };
  } catch (error) {
    console.log(error);
  }
};

// 하이라이트 해주는 함수
let addHighlight = ($target) => {
  $target.style.backgroundColor = HIGHLIGHT_COLOR;
};

// url 리스트(배열)를 받아 동작시키기
let list = makeSearchList();
console.log(list);

let test = (arr) => {
  arr.forEach(async (obj) => {
    const result = await getHtml(obj.link);
    console.log(obj.link, obj.target, result);

    if (result.keyExist) {
      addHighlight(obj.target);
    }
  });
};

test(list);
