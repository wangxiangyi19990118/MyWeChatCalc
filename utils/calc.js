/**!
 *
 * Copyright(c) boyce and other contributors.
 * MIT Licensed
 *
 * Authors:
 *  boyce <boyce.ywr@gmail.com> (http://www.jianshu.com/users/9b5b907d9bce)
 */

let Firstnumber = 0;//第一次按键结果
let Secondnumber = 0;//第二次按键结果
let Forthnumber = 0;//第三个记数量
let Thirdnumber = 0;//第四个记数量
let Secondnumber1 = 0;//一个中间量
let Number = 0;//一个中间量
let Result = 0;//计算结果
let op = 0;//判断操作数
let op1= 0;//存储上一个按键的操作数
let op3= 0;//判断是否继续刚才的计算
let count1= 0;//一个记数器
let count2= 0;//也是一个记数器
let isFirst= false;//判断是否有第一操作数
let isPoint = false;//判断是否按了小数点
let isSecNull = false;//判断是否有第二次按键
let isEqual = false;//判断是否按了“=”按钮
let isBack= true;//判断能否按下BACK按钮
let isClick= false;//判断是否按下了几个数字键
let displaynum=0;
let displayOp='';
let code;
/**
 * 重置程序状态
 */
function reset() {
  Result = 0;
  Firstnumber = 0;
  Secondnumber = 0;
  Thirdnumber = 0;
  Forthnumber = 0;
  isPoint = false;
  isSecNull = false;
  isEqual = false;
  isFirst = false;
  isBack = true;
  op = 0;
  isClick = false;
  op1 = 0;
}

/**
 * 是否为零
 */
function isZero(code) {
    return code == '0'
}

/**
 * 是否数字
 */
function isNumber(code) {
    return code >= '0' && code <= '9'
}

/**
 * 是否四则操作符
 */
function isOperator(code) {
    return code == '+' || code == '-'
        || code == 'x' || code == '/' 
}

/**
 * 是否小数点
 */
function isDot(code) {
    return code == '.'
}

/**
 * 是否是等号
 */
function isequal(code) {
    return code == '='
}

/**
 * 是否C
 */
function isClear(code) {
    return code == 'c'
}

/**
 * 是否删除
 */
function isDelete(code) {
    return code == 'd'
}

/**
 * 是否AC
 */
function isCE(code) {
  return code == 'CE'
}

/**
 * 是否平方
 */
function isSquare(code) {
  return code == 'x²'
}
/**
 * 是否开根号
 */
function isRooting(code) {
  return code == '√'
}

/**
 * 是否取倒数
 */
function isReciprocal(code) {
  return code == '1/x'
}
/**
 * 转换为可现实的操作符
 */
function op2Show(code) {
    return code == '/' ? '÷' : (code == 'x' ? '×' : code)
}

/**
 *
 */
function tryAppend(num, code) {
   // console.log(num,code);
    if (num.length < 15) {
        num += code
    }
    return num
}

function addOp(code) {
  console.log(code);
    if(isNumber(code)){
      if (op == 0) {//证明是第一计算数
        isClick = true;//按下了数字键
        count2++;
        isBack = true;//可以按下BACK键
        switch (1) {
          case 1:
            if (op == 0) {//证明是第一次计算，没有按加减乘除四个键
              if (isPoint == false) {//没有按下小数点键，即整数计算
                Firstnumber = parseFloat(tryAppend(displaynum + code));
                var first = Firstnumber;
                Number =parseInt(first) ;
                if (Firstnumber % 1 != 0)//如果结果是小数，直接输出结果
                  displaynum=Firstnumber;
                else//如果结果是整数，将浮点数转为整数显示
                  displaynum =parseInt( Firstnumber);
              } else if (isPoint == true)//按下了小数点键，就没有了判断结果是否是整数的阶段
              {
                Firstnumber =parseInt(displaynum);
                Thirdnumber = Firstnumber;
              }
              Thirdnumber = Firstnumber;//记录最近一次操作的结果
              isFirst = true;
            }
           else if(!displayOp=='') {//第二个操作数的计算
                if (displaynum=="0")
                  break;
                var second = Secondnumber;
                console.log(second);
                Number = parseInt( second);
                if (isPoint == false) {//判断是否按下了小数点键，其余判断和显示同上
                  isSecNull = true;
                  Secondnumber1 = parseFloat(tryAppend(displaynum + code));
                  Secondnumber = Secondnumber1;
                  if (Secondnumber % 1 != 0)
                    displaynum=Secondnumber+code;
                  else
                    text.setText(parseInt (Secondnumber1));
                }
                else if (isPoint == true) {//按了小数点键后的计算
                  isSecNull = true;
                 displaynum+=code;
                  Secondnumber =displaynum;
                }
                Thirdnumber = Secondnumber;//记录最近一次的操作结果
              }
        } if (displaynum.length> 17) { //如果位数超了，就不再进行输入
      
        }
    }
    }
    if (isOperator(code)){
      switch(code){
        case '+':
          displayOp='+'
          isPoint = false;
          if (isEqual == true && isClick == true) {//如果按下=号后又按了数字键，又过来按了加号，证明是重新开始计算，自动清零
            Firstnumber = Secondnumber;
            Secondnumber = 0;
            isEqual = false;
            Result = 0;
          }
          op = 1;//记录操作数为1
          switch (op1) {//对于刚才记录下来的第一第二操作数进行运算，如果刚才没有按下加减乘除，就跳出
            case 1://上一次是加法的情况
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber + Secondnumber;
              Secondnumber = 0;
              break;
            case 2://上一次是减法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber - Secondnumber;
              Secondnumber = 0;
              break;
            case 3://上一次是乘法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber * Secondnumber;
              Secondnumber = 0;
              break;
            case 4://上一次是除法
              if (Secondnumber == 0) {//如果被除数为零的话，报错
               displaynum='ERROR!'
                break;
              }
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber / Secondnumber;
              Secondnumber = 0;
              break;
            default:
              break;
          }
          op1 = op;//记录最近一次的操作数
          op3 = 1;//证明按下了四则运算按键
          break;
        case '-':
          displayOp='-'
          isPoint = false;
          if (isEqual == true && isClick == true) {//如果按下=号后又按了数字键，又过来按了加号，证明是重新开始计算，自动清零
            Firstnumber = Secondnumber;
            Secondnumber = 0;
            isEqual = false;
            Result = 0;
          }
          op = 2;//记录操作数为2
          switch (op1) {//对于刚才记录下来的第一第二操作数进行运算，如果刚才没有按下加减乘除，就跳出
            case 1://上一次是加法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber + Secondnumber;
              Secondnumber = 0;
              break;
            case 2://上一次是减法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber - Secondnumber;
              Secondnumber = 0;
              break;
            case 3://上一次是乘法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber * Secondnumber;
              Secondnumber = 0;
              break;
            case 4://上一次是除法
              if (Secondnumber == 0) {//如果被除数为零，报错
                displaynum = 'ERROR!'
                break;
              }
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber / Secondnumber;
              Secondnumber = 0;
              break;
            default:
              break;
          }
          op1 = op;//记录最近一次的操作数
          op3 = 1;//证明按下了四则运算按键
          break;
        case '*':
          displayOp='*'
          isPoint = false;
          if (isEqual == true && isClick == true) {//如果按下=号后又按了数字键，又过来按了加号，证明是重新开始计算，自动清零
            Firstnumber = Secondnumber;
            Secondnumber = 0;
            isEqual = false;
            Result = 0;
          }
          op = 3;//记录操作数为3
          switch (op1) {//对于刚才记录下来的第一第二操作数进行运算，如果刚才没有按下加减乘除，就跳出
            case 1://上一次是加法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber + Secondnumber;
              Secondnumber = 0;
              break;
            case 2://上一次是减法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber - Secondnumber;
              Secondnumber = 0;
              break;
            case 3://上一次是乘法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber * Secondnumber;
              Secondnumber = 0;
              break;
            case 4://上一次是除法
              if (Secondnumber == 0) {//如果被除数为零，报错
                displaynum = 'ERROR!'
                break;
              }
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber / Secondnumber;
              Secondnumber = 0;
              break;
            default:
              break;
          }
          op1 = op;//记录最近一次的操作数
          op3 = 1;//证明按下了四则运算按键
          break;
        case '/':
          displayOp='/'
          isPoint = false;
          if (isEqual == true && isClick == true) {//如果按下=号后又按了数字键，又过来按了加号，证明是重新开始计算，自动清零
            Firstnumber = Secondnumber;
            Secondnumber = 0;
            isEqual = false;
            Result = 0;
          }
          op = 4;//记录操作数为4
          switch (op1) {//对于刚才记录下来的第一第二操作数进行运算，如果刚才没有按下加减乘除，就跳出
            case 1://上一次是加法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber + Secondnumber;
              Secondnumber = 0;
              break;
            case 2://上一次是减法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber - Secondnumber;
              Secondnumber = 0;
              break;
            case 3://上一次是乘法
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber * Secondnumber;
              Secondnumber = 0;
              break;
            case 4://上一次是除法
              if (Secondnumber == 0) {//如果被除数为零，报错
                displaynum = 'ERROR!'
                break;
              }
              if (isEqual == true && isClick == false)//如果按了等于号直接按的运算符，不进行上一步运算的逻辑
                break;
              Firstnumber = Firstnumber / Secondnumber;
              Secondnumber = 0;
              break;
            default:
              break;
          }
          op1 = op;//记录最近一次的操作数
          op3 = 1;//证明按下了四则运算按键
          break;
        default:
          break;
      }
    }
    if(isequal(code)){
      isEqual = true;//表示按下了等于键
      isPoint = false;//小数点键复位
      isBack = false;//结果不能进行BACK运算
      if (op3 == 0) {//如果在上一次按下了等于键后只按了数字键没有按四则运算键，则直接根据上一次的四则运算符号对此数和上次最近操作数进行运算
        switch (op1) {
          case 1:
            if (isClick == true)//如果按了数字键，则证明不是连续运算
              Result = Forthnumber + Thirdnumber;//Forthnumber是上次最近的操作数，Thridnumber是本次最近操作数
            if (isClick == false) {
              Result = Result + Thirdnumber;//Forthnumber是上次最近的操作数，Thridnumber是本次最近操作数
              Firstnumber = Result;
            }
            if (Result % 1 != 0)//判断计算结果是否是整数
              displaynum=Result;
            else
              displaynum=parseInt(Result);
            break;
          case 2:
            if (isClick == true)//如果按了数字键，则证明不是连续运算
              Result = Forthnumber - Thirdnumber;//Forthnumber是上次最近的操作数，Thridnumber是本次最近操作数
            if (isClick == false) {
              Result = Result - Thirdnumber;
              Firstnumber = Result;
            }//Forthnumber是上次最近的操作数，Thridnumber是本次最近操作数
            if (Result % 1 != 0)//判断计算结果是否是整数
              displaynum = Result;
            else
              displaynum = parseInt(Result);
            break;
          case 3:
            if (isClick == true)//如果按了数字键，则证明不是连续运算
              Result = Forthnumber * Thirdnumber;//Forthnumber是上次最近的操作数，Thridnumber是本次最近操作数
            if (isClick == false) {
              Result = Result * Thirdnumber;
              Firstnumber = Result;
            }//Forthnumber是上次最近的操作数，Thridnumber是本次最近操作数
            if (Result % 1 != 0)//判断计算结果是否是整数
              displaynum = Result;
            else
              displaynum = parseInt(Result);
            break;
          case 4:
            if (Thirdnumber == 0) {//如果最近的数字是零并且上一次操作数为4，那么零就要成为被除数，报错
              displaynum='ERROR!'
              break;
            }
            if (isClick == true)//如果按了数字键，则证明不是连续运算
              Result = Forthnumber / Thirdnumber;//Forthnumber是上次最近的操作数，Thridnumber是本次最近操作数
            if (isClick == false) {
              Result = Result / Thirdnumber;
              Firstnumber = Result;
            }//Forthnumber是上次最近的操作数，Thridnumber是本次最近操作数
            if (Result % 1 != 0)//判断计算结果是否是整数
              displaynum = Result;
            else
              displaynum = parseInt(Result);
            break;
          default:
            break;
        }
        Secondnumber = 0;
      }
      if (op3 != 0)//如果有操作数
      {
        if (isClick == false)
          Thirdnumber = Firstnumber;
        if (op == 1)//加法
        {
          Result = Firstnumber + Thirdnumber;//最近操作数和第一计算数和最近的计算数进行运算
          if (Result % 1 != 0)//判断计算结果是否是整数
            displaynum = Result;
          else
            displaynum = parseInt(Result);
          Forthnumber = Thirdnumber;//保存最近的计算数字
          Secondnumber = 0;//第二计算数清零
          Firstnumber = Result;
        }//第一计算数等于本次计算结果
        if (op == 2) {//减法
          Result = Firstnumber - Thirdnumber;//最近操作数和第一计算数和最近的计算数进行运算
          if (Result % 1 != 0)//判断计算结果是否是整数
            displaynum = Result;
          else
            displaynum = parseInt(Result);
          Forthnumber = Thirdnumber;//保存最近的计算数字
          Secondnumber = 0;//第二计算数清零
          Firstnumber = Result;
        }//第一计算数等于本次计算结果
        if (op == 3) {
          Result = Firstnumber * Thirdnumber;//最近操作数和第一计算数和最近的计算数进行运算
          if (Result % 1 != 0)//判断计算结果是否是整数
            displaynum = Result;
          else
            displaynum = parseInt(Result);
          Forthnumber = Thirdnumber;//保存最近的计算数字
          Secondnumber = 0;//第二计算数清零
          Firstnumber = Result;
        }//第一计算数等于本次计算结果
        if (op == 4) {
          if (Thirdnumber == 0) {
            text11.setText("Error!");
            EnableButton();
          }
          else {
            Result = Firstnumber / Thirdnumber;//最近操作数和第一计算数和最近的计算数进行运算
            if (Result % 1 != 0)//判断计算结果是否是整数
              displaynum = Result;
            else
              displaynum = parseInt(Result);
            Forthnumber = Thirdnumber;//保存最近的计算数字
            Secondnumber = 0;//第二计算数清零
            Firstnumber = Result;
          }//第一计算数等于本次计算结果
        }
      }
      isClick = false;//恢复默认值
      op3 = 0;
      count2 = 0;
    }
    if (isClear(code)) {
      reset()
      displaynum = '0'
      displayOp = ''
    }
    if(isCE(code)){
      displaynum='0'
      if (op == 0)
        Firstnumber = 0;
      if (op != 0)
        Secondnumber = 0;
      Thirdnumber = 0;
    }
    if(isDot(code)){
      if (isPoint == false) {//如果之前没有按过小数点键，如果按了不做处理
        isPoint = true;
        var  Text1= parseFloat(displaynum)
        if (Text1 == 0 || (Text1 == Result && count2 == 0))//如果开始为0，
          displaynum=(("0" + ".").toString());
        else
          displaynum(parseInt( Text1  ) + ".");
      }
    }
    if(isSquare(code)){
      var res =parseFloat(displaynum);
      if (op == 0)
        Firstnumber = res * res;
      else Secondnumber = res * res;
      Thirdnumber = res * res;
      var result =(res * res);
      var result2= parseInt(res * res);
      if (parseFloat(result) % 1 != 0)
        displaynum=result;
      else
        displaynum = result2;
    }
    if(isReciprocal(code)){
      var res = parseFloat(displaynum);
      if (res != 0) {//被除数不为零
        if (op == 0)
          Firstnumber = 1 / res;
        else Secondnumber = 1 / res;
        Thirdnumber = 1 / res;
        var result1 = 1 / res;
        var result2= parseInt(1 / res);
        var number1 = parseFloat(String.valueOf(result1));
        if (result1 % 1 != 0)
          displaynum=result1;
        else
          displaynum= result2;
        op = 0;
      } else {//被除数为零，报错
        displaynum='ERROR!'
      }
    }
    if(isRooting(code)){
      var res =parseFloat(displaynum);
      if (res >= 0) {//如果底数大于等于零，正常计算
        if (op == 0)
          Firstnumber = (Math.sqrt(res));
        else Secondnumber = (Math.sqrt(res));
        Thirdnumber = (Math.sqrt(res));
        var result1 = (Math.sqrt(res));;
        var number1 = parseFloat(result1);
        var number2= parseInt( number1);
        if (result1 % 1 != 0)
          displaynum = result1;
        else
          displaynum = result2;
        op = 0;
      } else {//被除数为零，报错
        displaynum = 'ERROR!'
      }
    }
    if(isDelete(code)){

    }

    displayOp = op2Show(displayOp)
}

reset()

module.exports = {
    reset,addOp ,getVars(){
      return {
        displaynum, displayOp, code, Firstnumber, Secondnumber , Forthnumber,
        Thirdnumber , Secondnumber1 , Number ,op , op1, op3, count1, count2}
    }
}
