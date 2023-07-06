const staffs_node = document.querySelector("#staffs #staff")
const staffForm=document.querySelector("#staffForm")
const deleteButton=document.querySelector("#deleteBtn")
const editButton=document.querySelector("#editBtn")



editButton.addEventListener("click",handleEditStaff)
deleteButton.addEventListener("click",handleDeleteStaff)
staffForm.addEventListener("submit",handleFormSubmission)

let loadedstaff = {}


function handleFormSubmission(e) {
   e.preventDefault()
   const hiddenID=document.querySelector("#hidden_input")
   const staffID=document.querySelector("#staffID")
   const staffName=document.querySelector("#staffName")
   const gender=document.querySelector("#gender")
   const age=document.querySelector("#age")
   const department=document.querySelector("#department")
   const title=document.querySelector("#title")
   const salary=document.querySelector("#salary")
   const image=document.querySelector("#image")
    const id=hiddenID.value
    const staffDetails={

        staffID: staffID.value,
        staffName: staffName.value,
        gender: gender.value,
        age: age.value,
        department: department.value,
        title: title.value,
        salary: salary.value,
        image: image.value,
        likes: 0
      }

if (staffID.value==="" || staffName.value===""|| gender.value===""|| age.value===""|| department.value===""|| title.value===""|| salary.value===""|| image.value===""){
    alert("Fill all the fields");
    return false;
}


      if (id){
        const updateStaff={...staffDetails, id:id}
        Update_staff(updateStaff)
      }
      else{
        Add_new_staff(staffDetails)
      }
     
}

function Update_staff(staffDetails) {// I want to add new staff to the json.db
    fetch(`http://localhost:3000/Staff/${staffDetails.id}`, {
    method: "PATCH",
    headers:{
        "content-type": "application/json",
    },
    body: JSON.stringify(staffDetails),
})
        //.then(Response => Response.json())
        //.then(staffs => {
            //display_all_staffs(staffs)
           // console.log(staffs)
        //})
}

function handleEditStaff(e) {
    e.preventDefault()

    const hiddenID=document.querySelector("#hidden_input")
    const staffID=document.querySelector("#staffID")
    const staffName=document.querySelector("#staffName")
    const gender=document.querySelector("#gender")
    const age=document.querySelector("#age")
    const department=document.querySelector("#department")
    const title=document.querySelector("#title")
    const salary=document.querySelector("#salary")
    const image=document.querySelector("#image")
 

    hiddenID.value=loadedstaff.id
    staffID.value=loadedstaff.staffID
    staffName.value=loadedstaff.staffName
    gender.value=loadedstaff.gender
    age.value=loadedstaff.age
    department.value=loadedstaff.department
    title.value=loadedstaff.title
    salary.value=loadedstaff.salary
    image.value=loadedstaff.image
 }
 

function handleDeleteStaff(e) {
    if (staffID.value==="" ){
        alert("Fill all the fields");
        return false;
    }
    e.preventDefault()

    Delete_staff(loadedstaff.id)
 }
 



function Fetch_all_staffs() {
    fetch("http://localhost:3000/Staff")
        .then(Response => Response.json())
        .then(staffs => {
            display_all_staffs(staffs)
           // console.log(staffs)
        })
}


function display_all_staffs(staffs){
    staffs.forEach(staf => {
    const li=document.createElement("li")
    li.textContent=staf.staffName
    li.id=staf.id
    li.addEventListener("click", display_one_staff_details)
    staffs_node.appendChild(li)
});
}


function display_one_staff_details(e){
    const id=e.target.id
    fetchstaffById(id)
   }

   function fetchstaffById(id){
    fetch(`http://localhost:3000/Staff/${id}`)
    .then(Response => Response.json())
    .then(staf => {
        display_one_staff(staf)
    })
}

  function display_one_staff(staf){

    loadedstaff = staf
console.log(loadedstaff)

    const animalDetailsElement=document.querySelector("#staff-details")
    const staffID=animalDetailsElement.querySelector("#staffID")
    const staffName=animalDetailsElement.querySelector("#staffName")
    const gender=animalDetailsElement.querySelector("#gender")
    const age=animalDetailsElement.querySelector("#age")
    const department=animalDetailsElement.querySelector("#department")
    const title=animalDetailsElement.querySelector("#title")
    const salary=animalDetailsElement.querySelector("#salary")
    const likes=animalDetailsElement.querySelector("#likes")
    const image=animalDetailsElement.querySelector("#image")
    
    //id.textContent=data.title
    staffID.textContent=staf.staffID 
    staffName.textContent=staf.staffName
    gender.textContent=staf.gender 
    age.textContent=staf.age
    department.textContent=staf.department 
    title.textContent=staf.title
    salary.textContent=staf.salary 
    likes.textContent=staf.likes
    image.src=staf.image 

    //display_available_movies(movie)
    }

    function Add_new_staff(staffDetails) {// I want to add new staff to the json.db
        fetch("http://localhost:3000/Staff", {
        method: "POST",
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify(staffDetails),
    })
            //.then(Response => Response.json())
            //.then(staffs => {
                //display_all_staffs(staffs)
               // console.log(staffs)
            //})
    }

    //Add_new_staff();

    function Delete_staff(id) {// I want to add new staff to the json.db
        fetch(`http://localhost:3000/Staff/${id}`, {
        method: "DELETE",
        headers:{
            "content-type": "application/json",
        },
    })
            //.then(Response => Response.json())
            //.then(staffs => {
                //display_all_staffs(staffs)
               // console.log(staffs)
            //})
    }

function initialize_app(){
    Fetch_all_staffs(); 
}
console.log(loadedstaff.id)
document.addEventListener("DOMContentLoaded", initialize_app)
