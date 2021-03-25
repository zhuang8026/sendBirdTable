
let listdata=[];
let trBody,td1,td2,td3,td4,envData;

const envChange = (env) =>{
    let envList = {
        dev: {
            ApplicationID: '747C561B-9A50-4B8E-8EEF-38492D5F212D',
            APIokens:'773a72b6e56af26b682b1a35b5c36d0e82e550f8',
        },
        alpha: {
            ApplicationID: 'D91281B4-C59A-42E1-80F7-4117EF0071B4',
            APIokens:'5f635cf19c6390c9bb53f0ba8ef4a58715c6c58a',
        }
    }
    return envList[env];
}

/* Search */
const searchList = () => {
    let testInput =  document.getElementById("testInput").value;
    let num =  document.getElementById("number").value;
    // let env =  document.getElementById("env").value;
    let selectValue = document.getElementById("select").value;
    envData = envChange(selectValue) ? envChange(selectValue): 'env';
    console.log("input text:" , testInput);
    console.log("input number:" , num);
    // console.log("input env:" , env);
    console.log('envData:', envData);
    console.log('select:', selectValue);

    axios({
        method: "get",
        url: `https://api-${envData.ApplicationID}.sendbird.com/v3/group_channels?custom_type=${testInput}&limit=${num?num:10}`,
        headers: {
            "Content-Type": "application/json; charset=utf8",
            "Api-Token": envData.APIokens,
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
            console.log("deleteList:" , listdata);
            console.log("envData:" , envData);
            listdata.map((data, index)=>{
                axios({
                    method: "delete",
                    // 1on1_ryanKuo_ryankuo05
                    url: `https://api-${envData.ApplicationID}.sendbird.com/v3/group_channels/${data.channel_url}`,
                    headers: {
                        "Content-Type": "application/json; charset=utf8",
                        "Api-Token": envData.APIokens,
                    },
                })
                .then((res) => {
                    console.log("deleteList-res:" , res);
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