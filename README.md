## BMI Calculator

![bmi](https://user-images.githubusercontent.com/89143892/211474264-1c75f399-2f5d-4b5c-82f6-39d00730f092.jpg)

-BMI : 체질량 지수 <br/> -사용자가 직접 input을 입력하기 때문에 어떤 값이 들어올지 알 수 없다.<br/> -해당 기능을 필터링 하는 로직 구현<br/>
-ProgressBar를 사용하여 일반적으로 어느정도 수치인지 확인
-BMI는 소수점 아래 두자리까지 출력

### form 태그를 기준으로 HTML, CSS를 이용해서 웹페이지 구현

form으로 input을 컨트롤해야 사용자 친화적으로 여러 사람의 웹 접근성이 좋아진다.
<br/> -사용자 친화적으로 "몸무게"를 클릭해도 input에 커서가 활성화되게 구성

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
    <head>
        . .
        <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
        <script src="main.js"></script>
        <title>Calculator</title>
    </head>
    <body>
        <form onsubmit="onSubmit(event)">
            <div class="row">
                <div class="form-inp">
                    <label for="w"> 몸무게 (kg) </label>
                    <!-- 몸무게를 클릭해도 input에 커서가 활성화되게 구성하기 -->
                    <!-- 텍스트들이 숫자만 입력되도록 input타입 수정 -->
                    <input
                        class="inp"
                        type="number"
                        placeholder="kg 단위"
                        name="w"
                        id="w"
                    />
                </div>
                <div class="form-inp">
                    <label for="h"> 신장(m) </label>
                    <input
                        class="inp"
                        type="number"
                        placeholder="m 단위"
                        name="h"
                        id="h"
                    />
                </div>
                <!-- 현재 결과 버튼을 누르면 바로 아래에 결과값이 표시 될 수 있도록 
        submit 이벤트를 캔슬한다.  -->
                <button type="submit" class="btn">결과</button>
            </div>
        </form>
    </body>
</html>
```

### 결과값으로 소수점 2자리 까지만 나오게 로직 구성

```js
//main.js

function onSubmit(event) {
    event.preventDefault();

    const w = parseFloat(event.target[0].value);
    const h = parseFloat(event.target[1].value);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
        alert("적절한 값이 아닙니다.");
        return;
    }

    //toFixed(2)를 통해 소수점 2자리만 나오게 수정
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
    if (bmi > 25) {
        state = "과체중";
        common = false;
    }
    const stateElement = document.getElementById("state");
    stateElement.innerText = state;
    //common이 true 즉, 정상이라면 초록색, 아니라면 빨간색
    //? 앞에 있는 값은 boolean값 즉, true / false 값이어야 한다.
    stateElement.style.color = common ? "#29FF21" : "#FF3A3A";
}
```

### ProgressBar와 결과값 화면에 출력

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
        <script src="main.js"></script>
        <title>Calculator</title>
    </head>
    <body>
        <!-- reset을 한다면 document에서 res를 찾아 스타일의 디스플레이를 none으로 바꿔준다 -->
        <form
            onsubmit="onSubmit(event)"
            onreset="document.getElementById('res').style.display = 'none'"
        >
            <div class="row">
                <div class="form-inp">
                    <label for="w"> 몸무게 (kg) </label>

                    <!-- 최소값 설정해주기 -->
                    <input
                        class="inp"
                        type="number"
                        placeholder="kg 단위"
                        name="w"
                        id="w"
                        min="30"
                    />
                </div>
                <div class="form-inp">
                    <label for="h"> 신장(m) </label>

                    <!-- input에 자연수가 아닌 소수점도 입력할 수 있게 스텝추가하기  -->
                    <input
                        class="inp"
                        type="number"
                        step="0.01"
                        placeholder="m 단위"
                        name="h"
                        id="h"
                        min="0.5"
                    />
                </div>
                <button type="submit" class="btn">결과</button>
            </div>

            <div id="res">
                <!-- ProgressBar -->
                <div>
                    <!-- 높낮이에 따라 적절하게 프로그레스바 안의 컬러가 변하길 원하기 때문에 progress가 아닌 meter 태그를 사용 -->
                    <meter
                        style="width: 100%;"
                        min="10"
                        max="30"
                        optimum="22"
                        low="18.5"
                        high="25"
                        id="meter"
                    ></meter>
                </div>

                <!-- BMI 결과값 -->
                <div class="res-text">
                    <div>당신의 BMI는 <span id="bmi"></span>입니다.</div>
                    <div><span id="state"></span>입니다.</div>
                </div>

                <!-- 초기화 버튼 -->
                <!-- 현재 display가 flex상태이기 때문에 버튼이 가운데로 오질 않는데 inline-flex로 바꿔주면 된다. -->
                <div style="text-align: center;">
                    <!-- form으로 감쌌기 때문에 reset 버튼을 통해 초기화 할 수 있다. -->
                    <button type="reset" class="btn">초기화</button>
                </div>
            </div>
        </form>
    </body>
</html>
```

```css
/* main.css */

.btn {
    width: 148px;
    height: 48px;
    background-color: #2699fb;
    color: #fff;
    border-radius: 4px;
    outline: none;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
}

.btn:active {
    background-color: #007feb;
    outline: auto 2px #0055a0;
}

.inp {
    color: #48aeff;
    box-sizing: border-box;
    width: 204px;
    height: 48px;
    padding: 0 20px;
    background-color: white;
    border: solid 1px #48aeff;
    font-size: 14px;
}

.inp:active {
    outline: auto 2px #0055a0;
}

.inp::placeholder {
    color: #48aeff;
}

.row {
    display: flex;
    flex-direction: row;
    gap: 16px;
    /* 아래에 내려와서 붙어야 하기 때문에 flex-end를 준다 */
    align-items: flex-end;
}

/* inline 레벨인 label을 다시 block 레벨로 바꿔준다. */
.form-inp {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

/* label 스타일 적용 */
.form-inp label {
    font-size: 12px;
    color: #48aeff;
}

/* 처음에는 숨겨져 있어야 한다. 결과를 눌러야 그 때 출력.*/
#res {
    margin-top: 24px;
    /* display: none; */
    width: 588px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.res-text {
    color: #48aeff;
    text-align: center;
}

/* 자식선택자를 이용해서 각각 글씨크기 조정 */
.res-text > div:nth-child(1) {
    font-size: 32px;
}
.res-text > div:nth-child(2) {
    font-size: 24px;
}
```
