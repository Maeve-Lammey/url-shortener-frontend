<script setup>

import app from '../App.vue';
import UrlGrid from '../components/Grid.vue'

</script>

<script>

export default {

  data() {
    return {
      searchQuery: '',
      gridColumns: ['alias', 'url'],
      gridData: [],
      vAlias: '',
      vUrl: '',
    };
  },
  created() {
    this.getURLs()
  },
  methods: {
    async postAlias() {
      let response = await fetch("/api/createalias", {
      method: "POST",
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({session_token: app.session, alias: this.vAlias, url: this.vUrl }),
      });

      if (response.ok == true) {
        console.log("post successful")
        
        this.getURLs()
      }  

    },
    async getURLs() {
      try {
        const response = await fetch("/api/geturls", {
          method: "POST",
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ session_token: app.session }),
        });

        const data = await response.json()

        if (data.length != 0) {
          this.gridData = data
        } else {
          this.gridData = [{ alias: 'your alias here', url: 'your url here' }]
        }

      } catch (err) {
        console.error(err);
      }
    },
  },
}

</script>

<template>
  <div class="searchbar">
    <form id="search">
      <input class="search" placeholder="search" name="query" v-model="searchQuery">
    </form>
  </div>
  <table>
    <thead>
      <tr>
        <td>
          <input placeholder="url" v-model="vUrl"> {{ }}
        </td>
        <td>
          <input placeholder="alias" v-model="vAlias"> {{ }}
        </td>
        <td>
          <button @click="postAlias"> create </button>
        </td>
      </tr>
    </thead>
  </table>

  <UrlGrid :data="gridData" :columns="gridColumns" :filter-key="searchQuery">
  </UrlGrid>
</template>

<style>
input.search {
  width: 10%;
  height: 20px;
  border: 2px whitesmoke;
  border-radius: 9%/50%;
  text-align: left;
  font-size: 12px;
  padding: 4px;
  margin-left: 1%;
}

input.search:focus {
  background-color: #d3d3d3;
  outline: 1px solid #212020;
}

.searchbar {
  padding-bottom: 5px;
}
</style>