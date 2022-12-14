window.onload = function () {
  layLocalStorage();
};

let tasks = [];
class Task {
  constructor(content, activity = false) {
    this.content = content;
    this.activity = activity;
  }
}

const getElement = (id) => {
  return document.getElementById(id);
};
getElement("addItem").onclick = () => {
  let taskName = document.getElementById("newTask").value;
  // return ve rong
  document.getElementById("newTask").value = "";
  console.log(taskName);
  let task = new Task((content = taskName));
  console.log(task);
  tasks.push(task);
  console.log(tasks);
  renderTableTask(tasks);
  luuLocalStorage();
};
function renderTableTask(arrTask) {
  // sort a-z
  tasks.sort(function (a, b) {
    if (a.content < b.content) {
      return -1;
    }
    if (a.content > b.content) {
      return 1;
    }
    return 0;
  });
  let html = "";
  let done = "";
  for (let i = 0; i < arrTask.length; i++) {
    let arr = arrTask[i];
    if (arr.activity == false) {
      html += `
            <li>${arr.content} 
              <div>
                <i onclick="hoanThanh('${arr.content}')" class="fa-solid fa-circle-check"></i>
                <i onclick="xoaContent('${arr.content}')" class="fa-solid fa-trash-can"></i>
             </div> 
            </li>
  
         `;
    } else {
      done += `
            <li><div style = 'color:green' > ${arr.content} </div>
              <div>
              <i  style = 'color:green' onclick="hoanThanh('${arr.content}')" class="fa-solid fa-circle-check"></i>
                
                <i onclick="xoaContent('${arr.content}')" class="fa-solid fa-trash-can"></i>
             </div> 
            </li>
  
         `;
    }
  }
  document.getElementById("todo").innerHTML = html;
  document.getElementById("completed").innerHTML = done;

  console.log(html);
  luuLocalStorage();
}
function xoaContent(content) {
  console.log(content);
  let mang = [];
  for (let i = 0; i < tasks.length; i++) {
    if (!(content == tasks[i].content)) {
      mang.push(tasks[i]);
    }
  }
  tasks = mang;
  console.log(tasks);
  renderTableTask(tasks);
  luuLocalStorage();
}

function hoanThanh(content) {
  // task.activity = true;
  // console.log(tasks);
  for (let i = 0; i < tasks.length; i++) {
    if (content == tasks[i].content) {
      tasks[i].activity = true;
    }
  }
  console.log(tasks);
  renderTableTask(tasks);
  luuLocalStorage();
}
function luuLocalStorage() {
  // bi???n ?????i m???ng th??nh string
  let sTask = JSON.stringify(tasks);
  //sau ???? d??ng string luu v??o lucolstorge
  localStorage.setItem("tasks", sTask);
}
function layLocalStorage() {
  // check xem storage c?? d??? li???u ???? hya kh??ng
  if (localStorage.getItem("tasks")) {
    // l???y ra
    let stasks = localStorage.getItem("tasks");
    // l???y mangng??n = chu???i ???????c l???y t??? localstoragge ra( d??ng h??m JON.parse chuy???n v??? m???ng)
    tasks = JSON.parse(stasks);
    // t???a ta table tuef m???ng
    renderTableNhanVien(tasks);
  }
}
