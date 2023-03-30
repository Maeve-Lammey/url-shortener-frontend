<script setup>
    import app from '../App.vue';
    import { ref } from 'vue';
    import router from '../router/index.js'
</script>

<script>
    const username = ref('')
    const password = ref('')
    const email = ref('')
    const loginPassword = ref('')
    const loginUsername = ref('')

    async function createUser() {
        let response = await fetch("/api/new_user", {
            method: "POST",
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: username.value, email: email.value, password: password.value }),
        });

        if (response.ok == true) {
            app.session = (await response.json()).token;
            //console.log(session);
            router.push('/URLs');
        }
    }

    async function loginUser() {
        let response = await fetch("/api/login", {
            method: "POST",
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: loginUsername.value, password: loginPassword.value })
        });

        if (response.ok == true) {
            app.session = (await response.json()).token;
            router.push('/URLs');
        }
    }
</script>

<template>
    <div class="container">
            <div class="content"> 
                <input placeholder="username" class="field" v-model="username"> {{ }} 
            </div>
            <br>
            <div class="content">
                <input placeholder="email" class="field" v-model="email"> {{ }} 
            </div>
            <br>
            <div class="content"> 
                <input placeholder="password" class="field" type="password" v-model="password"> {{ }} 
            </div>
            <br>
            <div class="content">
                <button @click="createUser"> Create Account </button>
            </div>
    </div>
    <br>
    <div class="container">
            <div class="content"> 
                <input placeholder="username" class="field" v-model="loginUsername"> {{ }} 
            </div>
            <br>
            <div class="content"> 
                <input placeholder="password" class="field" type="password" v-model="loginPassword"> {{ }} 
            </div>
            <br>
            <div class="content" >
                <button @click="loginUser"> Login </button>
            </div>
    </div>
</template>

<style>

body {
 background-color:#212020
}

.container {
 width:15%;
 background-color:plum;
 border-radius:2%/3%;
  margin-left: auto;
  margin-right: auto;
}

button {
  width: 40%; 
  border-radius: 10%/50%;
}

input.field {
 width:60%;
 height:20px;
 border:2px whitesmoke;
 border-radius:9%/50%;
 text-align:left;
 font-size:12px;
 padding: 1%;
}
input.field:focus {
 background-color:#d3d3d3;
 outline: 1px solid #212020;
}
.content {
 display:flex;
 align-items:center;
 justify-content:center;
 padding-bottom:1%;
 padding-top: 1%;
}

</style>