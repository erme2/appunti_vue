<template>
    <base-card>
        <base-button @click="setSelectedTab('stored-resources')" :mode="selectedTab === 'stored-resources' ? null : 'flat'">Stored Resources</base-button>
        <base-button @click="setSelectedTab('add-resource')" :mode="selectedTab === 'add-resources' ? null : 'flat'">Add Resource</base-button>
    </base-card>
    <keep-alive>
        <component :is="selectedTab"></component>
    </keep-alive>
</template>

<script>
import AddResource from './AddResource.vue';
import StoredResources from './StoredResources.vue';

export default {
  components: {
    AddResource,
    StoredResources
  },
  provide(){
    return {
      resources: this.storedResources,
      addResource: this.addResource,
      deleteResource: this.deleteResource
    };
  },
  data() {
    return {
      selectedTab: 'stored-resources',
      storedResources: [
        {
          id: 'official-guide',
          title: 'Official Guide',
          description: 'The official VueJS documentation.',
          link: 'http://vuejs.org'
        },
        {
          id: 'google',
          title: 'Google',
          description: 'Learn to google...',
          link: 'http://google.com'
        }
      ]
    };
  },
  methods: {
    addResource(newRes) {
      this.storedResources.unshift(newRes);
      this.selectedTab = 'stored-resources';
    },
    deleteResource(resourceID) {
      // let deleteIndex = this.storedResources.findIndex(res => res.id === resourceID);
      let deleteIndex = null;
      for (let i in this.storedResources) {
        if (this.storedResources[i].id === resourceID) {
          deleteIndex = i;
        }
      }
      this.storedResources.splice(deleteIndex, 1);
    },
    setSelectedTab(tab){
      this.selectedTab = tab;
    }
  }
};
</script>
