function onSubmit(event) {
    event.preventDefault();

    const w = parseFloat(event.target[0].value);
    const h = parseFloat(event.target[1].value);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
        alert("적절한 값이 아닙니다.");
        return;
    }

    //toFixed(2)를 통해 소수점 2자리만 나오게 수정
    //일단 BMI를 변수에 담아줘야한다.
    const bmi = w / (h * h);

    console.log(bmi.toFixed(2));

    const res = document.getElementById("res");

    // 여기서 블록으로 만들어주지만 reset 할 경우 다시 none이 되어야 하기 때문에
    // html form에서 onreset을 넣어준다.
    res.style.display = "flex";

    //아이디 가져오기
    document.getElementById("bmi").innerText = bmi.toFixed(2);
    //프로그레스바 가져오기
    document.getElementById("meter").value = bmi;

    let state = "정상";
    let common = true;
    //만약에 bmi가 18.5 미만 일 때는 state가 저체중
    if (bmi < 18.5) {
        state = "저체중";
        common = false;
    }
    //만약에 bmi가 25 이상 일 때는 state가 과체중
    if (bmi >= 25) {
        state = "과체중";
        common = false;
    }
    const stateElement = document.getElementById("state");
    stateElement.innerText = state;
    //common이 true 즉, 정상이라면 초록색, 아니라면 빨간색
    //? 앞에 있는 값은 boolean값 즉, true / false 값이어야 한다.
    stateElement.style.color = common ? "#29FF21" : "#FF3A3A";
}
