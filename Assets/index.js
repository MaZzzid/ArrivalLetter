const $ = {
  date: "",
  engNums: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  benNums: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"],
  arriveList: {
    urea: { total: "", arrive: "" },
    tsp: { total: "", arrive: "" },
    mop: { total: "", arrive: "" },
    dap: { total: "", arrive: "" },
  },
};
const inputDate = document.querySelector("#input-date");
const inputName = document.querySelector("#input-name");
const inputAuthority = document.querySelector("#input-authority");
const inputGodown = document.querySelector("#input-godown");
const inputAllocType = document.querySelector("#input-alloctype");
const inputAllocMonth = document.querySelector("#input-allocmonth");
const inputAllocYear = document.querySelector("#input-allocyear");
const inputArriveDate = document.querySelector("#input-arrivedate");

const inputUrea = document.querySelector("#input-fertilizer-urea");
const inputUreaTotal = document.querySelector("#input-fertilizer-urea-total");
const inputTsp = document.querySelector("#input-fertilizer-tsp");
const inputTspTotal = document.querySelector("#input-fertilizer-tsp-total");
const inputMop = document.querySelector("#input-fertilizer-mop");
const inputMopTotal = document.querySelector("#input-fertilizer-mop-total");
const inputDap = document.querySelector("#input-fertilizer-dap");
const inputDapTotal = document.querySelector("#input-fertilizer-dap-total");
const pp = document.querySelector("#print");

const dateOfLetters = document.querySelectorAll(".date-of-letter");
const froms = document.querySelectorAll(".from");
const allocationMonthYear = document.querySelector(".allocation-month-year");
const allocType = document.querySelector(".alloctype");
// const fertilizeLists = document.querySelectorAll(".fertilizer-list")
const fertilizeListSubject = document.querySelector(".fertilizer-list-subject");
const fertilizeListBody = document.querySelector(".fertilizer-list-body");

const arrivalDate = document.querySelector(".arrival-date");
const authority = document.querySelectorAll(".authority");

const nameben = document.querySelectorAll(".name-ben");
const nameeng = document.querySelectorAll(".name-eng");
const proname = document.querySelector(".pro-name-ben");

function engNumStrToBenlaNumStr(numStr) {
  let benStr = "";
  [...numStr].forEach((niddle) => {
    let index = $.engNums.findIndex((ele) => {
      return ele === niddle;
    });

    if (index < 0) benStr += niddle;
    else benStr += $.benNums[index];
  });

  return benStr;
}

function numStrToDateStr(numStr) {
  let d = numStr.slice(0, 2);
  let m = numStr.slice(2, 4);
  let y = numStr.slice(4);

  return d + "-" + m + "-" + y;
}

function numberToFullMonth(number) {
  if (number === 0) number++;
  switch (number) {
    case 1:
      return "জানুয়ারী";
    case 2:
      return "ফেব্রুয়ারী";
    case 3:
      return "মার্চ";
    case 4:
      return "এপ্রিল";
    case 5:
      return "মে";
    case 6:
      return "জুন";
    case 7:
      return "জুলাই";
    case 8:
      return "আগষ্ট";
    case 9:
      return "সেপ্টেম্বর";
    case 10:
      return "অক্টোবর";
    case 11:
      return "নভেম্বর";
    case 12:
      return "ডিসেম্বর";
  }
}

// init first state
(function () {
  if (inputDate.textContent === "") {
    let date = new Date();
    let d = date.getDate(),
      m = date.getMonth() + 1,
      y = date.getFullYear();

    // Update InputAlloct Fields
    inputAllocMonth.selectedIndex = m - 1;
    inputAllocYear.value = engNumStrToBenlaNumStr("" + y).slice(2);

    d = d > 9 ? "" + d : "0" + d;
    m = m > 9 ? "" + m : "0" + m;
    y = "" + y;

    let benNum = engNumStrToBenlaNumStr(d + m + y);
    $.date = numStrToDateStr(benNum);

    dateOfLetters.forEach((dol) => {
      dol.textContent = $.date;
    });
  }

  froms.forEach((item) => {
    item.textContent = inputGodown.value;
  });
  inputDate.value = $.date;

  inputArriveDate.value = $.date;
  allocationMonthYear.textContent =
    inputAllocMonth.value + "-" + inputAllocYear.value;
  allocType.textContent = inputAllocType.value;

  inputDate.focus();
  inputDate.select();
})();

function parseNumberToDate(str) {
  let now = new Date();
  let d = now.getDate().toString(),
    m =
      (now.getMonth() + 1).toString().length === 1
        ? "0" + (now.getMonth() + 1).toString()
        : (now.getMonth() + 1).toString();
  y = now.getFullYear().toString();

  if (str.length === 1 || str.length === 2) {
    d = str.length === 1 ? "0" + str : str;
  } else if (str.length === 4) {
    d = str.slice(0, 2);
    m = str.slice(2);
  } else if (str.length === 6) {
    d = str.slice(0, 2);
    m = str.slice(2, 4);
    y = y.slice(0, 2) + str.slice(4);
  } else if (str.length === 8) {
    d = str.slice(0, 2);
    m = str.slice(2, 4);
    y = str.slice(4);
  } else {
    console.log(inputDate.value, d, m, y);
    throw new Error(`Can not parse: ${str}. (length must be 2, 4, 6, 8)`);
  }

  return d + m + +y;
}

inputDate.addEventListener("change", () => {
  try {
    let date = parseNumberToDate(inputDate.value);
    inputDate.classList.remove("error");
    date = engNumStrToBenlaNumStr(date);
    date = numStrToDateStr(date);

    inputArriveDate.value = date;
    dateOfLetters.forEach((dol) => {
      dol.textContent = date;
    });
    arrivalDate.textContent = date;
    inputDate.value = date;
  } catch (e) {
    inputDate.classList.add("error");
    return;
  }

  inputName.focus();
});

inputDate.addEventListener("click", () => {
  inputDate.select();
});

inputArriveDate.addEventListener("click", () => {
  inputArriveDate.select();
});

inputArriveDate.addEventListener("change", () => {
  try {
    let date = parseNumberToDate(inputArriveDate.value);
    inputDate.classList.remove("error");
    date = engNumStrToBenlaNumStr(date);
    date = numStrToDateStr(date);

    inputArriveDate.value = date;
    arrivalDate.textContent = date;
  } catch (e) {
    inputDate.classList.add("error");
    return;
  }
});

inputName.addEventListener("input", () => {
  let value = inputName.value;
  let options = inputName.querySelectorAll("option");
  let selectedIndex = inputName.selectedIndex;

  nameben.forEach((n) => {
    n.textContent = value;
  });
  nameeng.forEach((n) => {
    n.textContent = options[selectedIndex].dataset.engName;
  });

  proname.textContent = options[selectedIndex].dataset.proName;

  if (options[selectedIndex].dataset.hasLogo == 0)
    document.querySelector("svg").classList.add("hidden");
  else document.querySelector("svg").classList.remove("hidden");

  inputAuthority.focus();
});

inputAuthority.addEventListener("input", () => {
  let value = inputAuthority.value;
  authority.forEach((auth) => {
    auth.textContent = value;
  });

  inputGodown.focus();
});

inputGodown.addEventListener("input", () => {
  froms.forEach((f) => {
    f.textContent = inputGodown.value;
  });

  inputAllocType.focus();
});

inputAllocType.addEventListener("change", () => {
  allocType.textContent = inputAllocType.value;

  inputUrea.focus();
});

inputAllocMonth.addEventListener("change", () => {
  $.allocMonth = inputAllocMonth.value + "-" + inputAllocYear.value;
  allocationMonthYear.textContent = $.allocMonth;
});

inputAllocYear.addEventListener("change", () => {
  let year = engNumStrToBenlaNumStr(inputAllocYear.value);
  inputAllocYear.value = year;
  $.allocMonth = inputAllocMonth.value + "-" + inputAllocYear.value;
  allocationMonthYear.textContent = $.allocMonth;
});

function update() {
  let subjectStr = [];
  let bodyStr = [];

  // Urea text
  if (
    $.arriveList.urea.arrive.length > 0 &&
    $.arriveList.urea.total.length > 0
  ) {
    subjectStr.push(` <b>${$.arriveList.urea.arrive}</b> মে.টন <i>ইউরিয়া</i>`);
    bodyStr.push(
      ` <b>${$.arriveList.urea.total}</b> মে.টন <i>ইউরিয়া</i> সারের মধ্যে <b>${$.arriveList.urea.arrive}</b> মে.টন <i>ইউরিয়া</i> সার`
    );
  } else if ($.arriveList.urea.arrive.length > 0) {
    subjectStr.push(` <b>${$.arriveList.urea.arrive}</b> মে.টন <i>ইউরিয়া</i>`);
    bodyStr.push(` <b>${$.arriveList.urea.arrive}</b> মে.টন <i>ইউরিয়া</i> সার`);
  } else if ($.arriveList.urea.total.length > 0) {
    subjectStr.push(` <b>${$.arriveList.urea.total}v মে.টন <i>ইউরিয়া</i>`);
    bodyStr.push(
      ` <b>${$.arriveList.urea.total}</b> মে.টন <i>ইউরিয়া</i> সারের মধ্যে <b>${$.arriveList.urea.total}</b> মে.টন <i>ইউরিয়া</i> সার`
    );
  }

  // Tsp text

  if ($.arriveList.tsp.arrive.length > 0 && $.arriveList.tsp.total.length > 0) {
    console.log($.arriveList.tsp.arrive, $.arriveList.tsp.total);
    subjectStr.push(` <b>${$.arriveList.tsp.arrive}</b> মে.টন <i>টি.এস.পি</i>`);
    bodyStr.push(
      ` <b>${$.arriveList.tsp.total}</b> মে.টন <i>টি.এস.পি</i> সারের মধ্যে <b>${$.arriveList.tsp.arrive}</b> মে.টন <i>টি.এস.পি</i> সার`
    );
  } else if ($.arriveList.tsp.arrive.length > 0) {
    subjectStr.push(` <b>${$.arriveList.tsp.arrive}</b> মে.টন <i>টি.এস.পি</i>`);
    bodyStr.push(
      ` <b>${$.arriveList.tsp.arrive}</b> মে.টন <i>টি.এস.পি</i> সার`
    );
  } else if ($.arriveList.tsp.total.length > 0) {
    subjectStr.push(` <b>${$.arriveList.tsp.total}</b> মে.টন <i>টি.এস.পি</i>`);
    bodyStr.push(
      ` <b>${$.arriveList.tps.total}</b> মে.টন <i>টি.এস.পি</i> সারের মধ্যে <b>${$.arriveList.tsp.total}</b> মে.টন <i>টি.এস.পি</i> সার`
    );
  }

  // Mop text

  if ($.arriveList.mop.arrive.length > 0 && $.arriveList.mop.total.length > 0) {
    subjectStr.push(` <b>${$.arriveList.mop.arrive}</b> মে.টন <i>এম.ও.পি</i>`);
    bodyStr.push(
      ` <b>${$.arriveList.mop.total}</b> মে.টন <i>এম.ও.পি</i> সারের মধ্যে <b>${$.arriveList.mop.arrive}</b> মে.টন <i>এম.ও.পি</i> সার`
    );
  } else if ($.arriveList.mop.arrive.length > 0) {
    subjectStr.push(` <b>${$.arriveList.mop.arrive}</b> মে.টন <i>এম.ও.পি</i>`);
    bodyStr.push(` <b>${$.arriveList.mop.arrive}</b> মে.টন <i>এম.ও.পি</i> সার`);
  } else if ($.arriveList.mop.total.length > 0) {
    subjectStr.push(` <b>${$.arriveList.mop.total}</b> মে.টন <i>এম.ও.পি</i>`);
    bodyStr.push(
      ` <b>${$.arriveList.mop.total}</b> মে.টন <i>এম.ও.পি</i> সারের মধ্যে <b>${$.arriveList.urea.total}</b> মে.টন <i>এম.ও.পি</i> সার`
    );
  }

  // dap text

  if ($.arriveList.dap.arrive.length > 0 && $.arriveList.dap.total.length > 0) {
    subjectStr.push(` <b>${$.arriveList.dap.arrive}</b> মে.টন <i>ডি.এ.পি</i>`);
    bodyStr.push(
      ` <b>${$.arriveList.dap.total}</b> মে.টন <i>ডি.এ.পি</i> সারের মধ্যে <b>${$.arriveList.dap.arrive}</b> মে.টন <i>ডি.এ.পি</i> সার`
    );
  } else if ($.arriveList.dap.arrive.length > 0) {
    subjectStr.push(` <b>${$.arriveList.dap.arrive}</b> মে.টন <i>ডি.এ.পি</i>`);
    bodyStr.push(` <b>${$.arriveList.dap.arrive}</b> মে.টন <i>ডি.এ.পি</i> সার`);
  } else if ($.arriveList.dap.total.length > 0) {
    subjectStr.push(` <b>${$.arriveList.dap.total}</b> মে.টন <i>ডি এ পি</i>`);
    bodyStr.push(
      ` <b>${$.arriveList.dap.total}</b> মে.টন <i>ডি.এ.পি</i> সারের মধ্যে <b>${$.arriveList.dap.total}</b> মে.টন <i>ডি.এ.পি</i> সার>`
    );
  }

  // update Ui

  let ss = "";
  let bs = "";

  for (let i in subjectStr) {
    ss += subjectStr[i];
    bs += bodyStr[i];

    if (subjectStr.length > 1 && Number(i) === subjectStr.length - 2) {
      ss += " ও";
      bs += " ও";
    } else if (subjectStr.length > 2 && Number(i) !== subjectStr.length - 1) {
      ss += ",";
      bs += ",";
    }
  }

  fertilizeListSubject.innerHTML = ss;
  fertilizeListBody.innerHTML = bs;
}

let arr = [
  inputDate,
  inputName,
  inputAuthority,
  inputGodown,
  inputAllocType,
  inputUrea,
  inputUreaTotal,
  inputTsp,
  inputTspTotal,
  inputMop,
  inputMopTotal,
  inputDap,
  inputDapTotal,
  pp,
];

for (let i = 0; i < arr.length; i++) {
  arr[i].addEventListener("keypress", (ev) => {
    if (ev.keyCode === 13) {
      if (i !== arr.length - 1) {
        arr[i + 1].focus();
      }
    }
  });
}

inputUrea.addEventListener("change", (e) => {
  let arrive = engNumStrToBenlaNumStr(inputUrea.value);
  let total = engNumStrToBenlaNumStr(inputUreaTotal.value);

  $.arriveList.urea.total = total;
  $.arriveList.urea.arrive = arrive;

  inputUrea.value = arrive;

  update();

  inputUreaTotal.focus();
});

inputUreaTotal.addEventListener("change", () => {
  let arrive = engNumStrToBenlaNumStr(inputUrea.value);
  let total = engNumStrToBenlaNumStr(inputUreaTotal.value);

  $.arriveList.urea.total = total;
  $.arriveList.urea.arrive = arrive;

  inputUreaTotal.value = total;
  update();
  inputTsp.focus();
});

inputTsp.addEventListener("change", () => {
  let arrive = engNumStrToBenlaNumStr(inputTsp.value);
  let total = engNumStrToBenlaNumStr(inputTspTotal.value);

  $.arriveList.tsp.total = total;
  $.arriveList.tsp.arrive = arrive;

  inputTsp.value = arrive;
  update();

  inputTspTotal.focus();
});

inputTspTotal.addEventListener("change", () => {
  let arrive = engNumStrToBenlaNumStr(inputTsp.value);
  let total = engNumStrToBenlaNumStr(inputTspTotal.value);

  $.arriveList.tsp.total = total;
  $.arriveList.tsp.arrive = arrive;

  inputTspTotal.value = total;
  update();

  inputMop.focus();
});

inputMop.addEventListener("change", () => {
  let arrive = engNumStrToBenlaNumStr(inputMop.value);
  let total = engNumStrToBenlaNumStr(inputMopTotal.value);

  $.arriveList.mop.total = total;
  $.arriveList.mop.arrive = arrive;

  inputMop.value = arrive;
  update();
  inputMopTotal.focus();
});

inputMopTotal.addEventListener("change", () => {
  let arrive = engNumStrToBenlaNumStr(inputMop.value);
  let total = engNumStrToBenlaNumStr(inputMopTotal.value);

  $.arriveList.mop.total = total;
  $.arriveList.mop.arrive = arrive;

  inputMopTotal.value = total;
  update();
  inputDap.focus();
});

inputDap.addEventListener("change", () => {
  let arrive = engNumStrToBenlaNumStr(inputDap.value);
  let total = engNumStrToBenlaNumStr(inputDapTotal.value);

  $.arriveList.dap.total = total;
  $.arriveList.dap.arrive = arrive;

  inputDap.value = arrive;
  update();
  inputDapTotal.focus();
});

inputDapTotal.addEventListener("change", () => {
  let arrive = engNumStrToBenlaNumStr(inputDap.value);
  let total = engNumStrToBenlaNumStr(inputDapTotal.value);

  $.arriveList.dap.total = total;
  $.arriveList.dap.arrive = arrive;

  inputDapTotal.value = total;
  update();
  pp.focus();
});

pp.addEventListener("click", () => {
  print();
});
