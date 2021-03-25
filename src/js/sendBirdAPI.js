
const Domain = "https://api-747C561B-9A50-4B8E-8EEF-38492D5F212D.sendbird.com/v3";
let listdata=[];
let trBody,td1,td2,td3,td4;

/* Search */
const searchList = () => {
    let testInput =  document.getElementById("testInput").value;
    let num =  document.getElementById("number").value;
    console.log("input text:" , testInput);
    console.log("input number:" , num);

    axios({
        method: "get",
        url: `${Domain}/group_channels?custom_type=${testInput}&limit=${num?num:10}`,
        headers: {
            "Content-Type": "application/json; charset=utf8",
            "Api-Token": "773a72b6e56af26b682b1a35b5c36d0e82e550f8",
        },
    })
    .then((res) => {
        document.getElementById("tbodyInner").innerHTML="";
        if(listdata.length > 0){
            listdata=[];
        }
        if(res.data.channels.length > 0){
            listdata.push(...res.data.channels);
            console.log("searchListAPI:" , listdata);
            listdata.map((data, index) => {
                trBody = document.createElement("tr");
                td1 = document.createElement("td");
                td2 = document.createElement("td");
                td3 = document.createElement("td");
                td4 = document.createElement("td");
    
                td1.appendChild(document.createTextNode(index + 1));
                td2.appendChild(document.createTextNode(data.name));
                td3.appendChild(document.createTextNode(data.member_count));
                td4.appendChild(document.createTextNode(data.custom_type == '' ? '-': data.custom_type));
    
                trBody.appendChild(td1);
                trBody.appendChild(td2);
                trBody.appendChild(td3);
                trBody.appendChild(td4);
                document.getElementById("tbodyInner").appendChild(trBody);
            });
        } else {
            document.getElementById("tbodyInner").innerHTML ="Sorry...no data"
        }



    })
    .catch((err) => {
        console.error("searchList:", err);
    });
};

const deleteList = () => {
    if(listdata.length > 0){
        let confirmBoolean = confirm(`Are you sure delete ${listdata.length} items?`);

        if (confirmBoolean) {
            // console.log("searchListAPI:" , listdata);
            listdata.map((data, index)=>{
                axios({
                    method: "delete",
                    url: `${Domain}/group_channels/${data.name}`,
                    headers: {
                        "Content-Type": "application/json; charset=utf8",
                        "Api-Token": "773a72b6e56af26b682b1a35b5c36d0e82e550f8",
                    },
                })
                .then((res) => {
                    if(res.status == 200) {
                        console.log("success delete:" , data.name);
                        document.getElementById("tbodyInner").innerHTML="";
                    } else {
                        alert("error");
                    }
                    
                })
                .catch((err) => {
                    console.error("deleteList:", err);
                });
            });
        } else {
            alert('has been cancel');
        }
    } else {
        alert("nothing can delete");
    }

    
    
};