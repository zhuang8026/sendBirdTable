
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
    let selectValue = document.getElementById("select").value;
    envData = envChange(selectValue) ? envChange(selectValue): 'env';

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
            listdata.map((data, index)=>{
                axios({
                    method: "delete",
                    // 1on1_ryanKuo_ryankuo05
                    // url: `https://api-${envData.ApplicationID}.sendbird.com/v3/group_channels/${data.channel_url}`,
                    // headers: {
                    //     "Content-Type": "application/json; charset=utf8",
                    //     "Api-Token": envData.APIokens,
                    // },
                    url: `https://cors-anywhere.herokuapp.com/https://gate.sendbird.com/platform/v3/group_channels/${data.channel_url}`,
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMDA0MjgwMSIsImVtYWlsIjoiZHoyMC5lYkBnbWFpbC5jb20iLCJleHAiOjE2MTY3Mjk3ODEsInBhc3N3b3JkX3VwZGF0ZWRfYXQiOm51bGwsImVtYWlsX3VwZGF0ZWRfYXQiOm51bGwsIm9yZ2FuaXphdGlvbl9pZCI6NTAwMjYyNzgsIm9yZ2FuaXphdGlvbl9tZW1iZXJfaWQiOjUyNDAyLCJyb2xlX25hbWUiOiJPV05FUiIsInBlcm1pc3Npb25fa2V5cyI6WyJvcmdhbml6YXRpb24uZ2VuZXJhbC5hbGwiLCJvcmdhbml6YXRpb24uc2VjdXJpdHkuYWxsIiwib3JnYW5pemF0aW9uLm1lbWJlcnMuYWxsIiwib3JnYW5pemF0aW9uLnJvbGVzLmFsbCIsIm9yZ2FuaXphdGlvbi5hcHBsaWNhdGlvbnMuYWxsIiwib3JnYW5pemF0aW9uLmJpbGxpbmcuYWxsIiwib3JnYW5pemF0aW9uLnVzYWdlLmFsbCIsImFwcGxpY2F0aW9uLm92ZXJ2aWV3LnZpZXciLCJhcHBsaWNhdGlvbi5jaGFubmVscy5vcGVuQ2hhbm5lbC5hbGwiLCJhcHBsaWNhdGlvbi5jaGFubmVscy5ncm91cENoYW5uZWwuYWxsIiwiYXBwbGljYXRpb24uYW5ub3VuY2VtZW50cy5hbGwiLCJhcHBsaWNhdGlvbi5kYXRhRXhwb3J0LmFsbCIsImFwcGxpY2F0aW9uLm1lc3NhZ2VTZWFyY2guYWxsIiwiYXBwbGljYXRpb24udXNlcnMuYWxsIiwiYXBwbGljYXRpb24uYW5hbHl0aWNzLnZpZXciLCJhcHBsaWNhdGlvbi5zZXR0aW5ncy5hbGwiLCJkZXNrLmFkbWluIiwiY2FsbHMuc3R1ZGlvLmFsbCIsInN1cHBvcnQudGVjaG5pY2FsIl0sImFjY2Vzc19jb250cm9sbGVkX2FwcGxpY2F0aW9uX2lkcyI6W10sImlhdCI6MTYxNjY0MzM4MX0.r7-mzhSFlLoeEgccVdMZdERFJ9wPL-TN3YuMNJ4LOi8",
                        //authorization可能每次都需更換(sendbird內按search即可找到)
                        "app-id": envData.ApplicationID
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