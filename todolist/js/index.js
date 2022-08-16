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
  // biến đổi mảng thành string
  let sTask = JSON.stringify(tasks);
  //sau đó dùng string luu vào lucolstorge
  localStorage.setItem("tasks", sTask);
}
function layLocalStorage() {
  // check xem storage có dữ liệu đó hya không
  if (localStorage.getItem("tasks")) {
    // lấy ra
    let stasks = localStorage.getItem("tasks");
    // lấy mangngán = chuối được lấy từ localstoragge ra( dùng hàm JON.parse chuyển về mảng)
    tasks = JSON.parse(stasks);
    // tọa ta table tuef mảng
    renderTableNhanVien(tasks);
  }
}
