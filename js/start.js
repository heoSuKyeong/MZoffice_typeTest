const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 20;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// 점수 계산
function calResult(){
  var result = 0;
  for (let i = 0; i < select.length; i++) {
    result += select[i]; 
  }
  
  console.log("최종 답안 : " + select);
  console.log("총 합 : " + result);

  if(result >= 20 && result <=36){
    return 1;
  }
  else if(result >= 37 && result <=52){
    return 2;
  }
  else if(result >= 53 && result <=68){
    return 3;
  }
  else if(result >= 69 && result <=84){
    return 4;
  }
  else if(result >= 85 && result <=100){
    return 5;
  }

}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[5-point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/result_img-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[5-point].desc;
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
    }, 450)})
    setResult();
}

function addAnswer(answerText, qIdx, answerNumber){
  //이미지 넣기
  var questionImg = document.querySelector('#qimg');
  questionImg.classList.add('fadeIn');
  
  var QimgURL = 'img/question_img-' + qIdx + '.png';
  questionImg.src = QimgURL;
  questionImg.alt = qIdx;
  
  //질문지 넣기
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;

  // 답안 선택시 이벤트
  answer.addEventListener("click", function(){
    /*QimgDiv.style.display = 'none';*/

    var children = document.querySelectorAll('.answerList');
    
    // 모든 선택지 초기화후 사라짐
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    
    setTimeout(() => {
      // 선택 점수 저장
      switch (answerNumber) {
        case 0:
          select[qIdx] = 1;
          break;

        case 1:
          select[qIdx] = 5;
          break;
      
        default:
          console.log(qIdx+1 + "번 문제 점수 선택 오류")
          break;
      }
      console.log(select)

      // 숨기기
      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    },450)
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }
  var p = document.querySelector('.page');
  p.innerHTML = qIdx+1 + "/" + endPoint;


  // 질문 만들기
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;

  // 기본 선택
  for(let i = 0; i < qnaList[qIdx].a.length; i++){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }

  // 질문 상태 바 업데이트
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  document.body.style.backgroundImage = "url()";
  document.body.style.backgroundColor = "balck";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block"
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}