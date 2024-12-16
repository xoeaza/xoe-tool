// 隐藏表单字段
function hideField(name) {
  $(name).closest("td").prev("td").hide();
  $(name).closest("td").hide();
  $(name).removeClass("required");
}

function hideOption(name, vals) {
  const valArray = Array.isArray(vals) ? vals : [vals];
  
  if (valArray.includes($(name).val())) {
    $(name).val("").trigger("change");
    $(name).find("option:selected").removeAttr("selected", "selected");
  }

  valArray.forEach(val => {
    $(`${name} option[value="${val}"]`).hide();
  });
}

function showField(name) {
  $(name).closest("td").prev("td").show();
  $(name).closest("td").show();
}

function hideSetField(tableId, valueName) {
  $(`#${tableId} thead th[field="${valueName}"]`).hide();
  $(`#${tableId} tbody td[field="${valueName}"]`).hide();
}

function showSetField(tableId, valueName) {
  $(`#${tableId} thead th[field="${valueName}"]`).show();
  $(`#${tableId} tbody td[field="${valueName}"]`).show();
}

function readOnly(name) {
  $(name).attr("readonly", true);
}

function removeReadOnly(name) {
  $(name).attr("readOnly", false);
}

function disableField(name) {
  $(name).attr("disabled", true);
}

function enableField(name) {
  $(name).attr("disabled", false);
}

function addRequireStar(name) {
  let element = $(name).parent().prev();
  let firstChild = element.children().first();
  let star = firstChild.is("span") && firstChild.text() === "*";
  if (!star) {
    element.prepend('<span style="color:red;font-weight:bold;">*</span>');
  }
}

function removeRequireStar(name) {
  let element = $(name).parent().prev();
  let firstChild = element.children().first();
  let star = firstChild.is("span") && firstChild.text() === "*";
  if (star) {
    firstChild.remove();
  }
}

function addRequired(name) {
  $(name).addClass("required");
  addRequireStar(name);
}

function removeRequired(name) {
  $(name).removeClass("required");
  removeRequireStar(name);
}

// 解析数字，取去除千分号的数字
function parseNumber(input) {
  if (input === undefined || input === null) {
    return 0;
  }
  // 如果输入是数字，直接返回
  if (!isNaN(input)) {
    return Number(input);
  }
  // 去除千分号和空格，然后尝试转换为数字
  const cleanedInput = input.toString().replace(/[, ]/g, "");
  const parsedNumber = Number(cleanedInput);
  // 检查转换后的数字是否有效
  if (!isNaN(parsedNumber)) {
    return parsedNumber;
  } else {
    return 0;
  }
}

function clearFormField(selector) {
  let $field = $(selector);

  if ($field.length === 0) {
    console.warn("No field found with selector: " + selector);
    return;
  }

  if ($field.is('input[type="text"], input[type="password"], input[type="email"], input[type="number"], textarea')) {
    $field.val("");
  } else if ($field.is('input[type="checkbox"], input[type="radio"]')) {
    $field.prop("checked", false);
  } else if ($field.is("select")) {
    $field.prop("selectedIndex", 0);
  } else {
    console.warn("Unsupported field type for selector: " + selector);
  }
}

// 计算公式
// 原來的視圖上
// 安全的数字运算
// 加法
function accAdd(arg1, arg2) {
  let r1, r2;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
// 减法
function accSub(arg1, arg2) {
  let r1, r2;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = Math.pow(10, Math.max(r1, r2));
  // 动态控制精度长度
  const n = r1 >= r2 ? r1 : r2;
  return Number.parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
}
// 乘法
function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / Math.pow(10, m);
}
// 除法
function accDiv(arg1, arg2) {
  let t1 = 0;
  let t2 = 0;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  const r1 = Number(arg1.toString().replace(".", ""));
  const r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

// 添加点击绑定函数
function addFn(name, fn) {
  $(name).attr("onclick", fn);
}

// 判断是否是初始发起或者暂存节点
// instance.instanceNodeState == -1 是初始未暂存状态;instance.instanceNodeState == 4就是暂存;instance.instanceNodeState == 8 就是驳回;
function isInitNode() {
  if (instance.instanceNodeState == -1 || instance.instanceNodeState == 4) {
    return true;
  }
  return false;
}

// 获取table index
function getSetTableIndex(tableId) {
  var rowIndex = [];
  $("#" + tableId + " tbody tr:not([data-type='total'])").each(function () {
    var trid = $(this).attr("trid");
    var tridNum = trid.substring(trid.lastIndexOf("_") + 1, trid.length);
    rowIndex.push(parseInt(tridNum));
  });
  return rowIndex.length > 0 ? Math.max.apply(null, rowIndex) + 1 : 0;
}

// 对获取table下某一列的某个表格
function getTableItem(tableId, valueName) {
  for (let r = 0; r < $(`#${tableId} tbody`).children().length + 1; r++) {
    for (let i = 5; i < 9; i++) {
      $(`#${tableId}`)
        .find(`tr[trid="${tableId}_${r}"]`)
        // .find("select[setname='f_value_067']")
        // .find(`option:eq(${i})`)
        // .css("display", isShow == "revert" ? "none" : "revert");
    }
  }
}

function addRedText(name, text) {
  let element = $(name).parent().prev();
  // 排除必选项星号，只查找非第一个红色文本
  let existingText = element.children().not(':first-child').filter('span[style*="color:red"], span[style*="color: rgb(255, 0, 0)"]');
  if (existingText.length === 0) {
    element.append('<br>');
    element.append(`<span style="background-color:transparent;color:red;font-size:12px;">${text}</span>`);
  }
}

function removeRedText(name) {
  let element = $(name).parent().prev();
  // 排除必选项星号，只移除非第一个红色文本
  element.children().not(':first-child').filter('span[style*="color:red"], span[style*="color: rgb(255, 0, 0)"]').remove();
  element.find('br').remove();
}

function addElementRedText(name, text) {
  let element = $(name).parent();
  // 排除必选项星号，只查找非第一个红色文本
  let existingText = element.children().filter('span[style*="color:red"], span[style*="color: rgb(255, 0, 0)"]');
  if (existingText.length === 0) {
    element.append(`<span style="background-color:transparent;color:red;font-size:12px;display:inline-block;">${text}</span>`);
  }
}

function removeElementRedText(name) {
  let element = $(name).parent();
  // 排除必选项星号，只移除非第一个红色文本
  element.children().filter('span[style*="color:red"], span[style*="color: rgb(255, 0, 0)"]').remove();
  element.find('br').remove();
}

