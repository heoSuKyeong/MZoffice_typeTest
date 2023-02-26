const url = 'https://mzoffice-typetest.netlify.app';
//카카오 테스트 링크 공유
function mainKakao() {
  const shareTitle = 'MZ테스트';

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: 'MZ테스트',
      description: '당신은 젊은 꼰대인가? MZ인가',
      imageUrl: '../img/main.png',
      link: {
        mobileWebUrl: url,
        webUrl: url
      },
    },

    buttons: [
      {
        title: 'MZ테스트',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    ]
  });
}

//카카오 테스트 결과 공유
function shareKakao(){
    var resultImg = document.querySelector('#resultImg');
    var resultAlt = resultImg.firstElementChild.alt;
    const shareTitle = 'MZ테스트 결과';
    const shareDes = infoList[resultAlt].name;
    const shareImage = url + 'img/image-' + resultAlt + '.png';
    const shareURL = url + 'page/result-' + resultAlt + '.html';
  
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: shareTitle,
        description: shareDes,
        imageUrl: shareImage,
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL
        },
      },
  
      buttons: [
        {
          title: '결과확인하기',
          link: {
            mobileWebUrl: shareURL,
            webUrl: shareURL,
          },
        },
      ]
    });
  }

// 테스트 링크 복사 기능  
function mainClip() {
	navigator.clipboard.writeText(window.location.href);
  Swal.fire(
    '테스트 링크가 복사되었습니다.',
    'success'
  )
}

// 테스트 결과 링크 복사 기능  
function clip() {
  var resultImg = document.querySelector('#resultImg');
  var resultAlt = resultImg.firstElementChild.alt;
  const shareURL = url + 'page/result-' + resultAlt + '.html';
  var clipUrl = '';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	clipUrl = shareURL;
	textarea.value = clipUrl;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	// navigator.clipboard.writeText(window.location.href);
  Swal.fire(
    '결과 링크가 복사되었습니다.',
    'success'
  )
}