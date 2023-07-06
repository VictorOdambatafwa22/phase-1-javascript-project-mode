const staffs_node = document.querySelector("#staffs #staff")

let loadedstaff = {}

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

    function Add_new_staff() {// I want to add new staff to the json.db
        fetch("http://localhost:3000/Staff")
            .then(Response => Response.json())
            .then(staffs => {
                display_all_staffs(staffs)
               // console.log(staffs)
            })
    }

function initialize_app(){
    Fetch_all_staffs(); 
}

document.addEventListener("DOMContentLoaded", initialize_app)
