<template>
  
    <div id="file-manager" class="flex-column padding-8" >

        <div
            class="flex-row justify-space-between align-end margin-bottom-16 padding-bottom-8"
            :class="historyMode?'underline':''" style="margin-top:8px"
        >
            <BreadCrumbs :path="$route.path"/>

            <span>
                <a :href="fileUrl" :download="file?file.name:''">
                    <button
                        v-show="file"
                    >
                        <i class="fas fa-download" />
                        Download
                    </button>
                </a>
        
                <button style="margin-left:4px;" 
                    @click="historyMode=!historyMode"
                >
                    <i class="fas fa-history" v-show="!historyMode"/>
                    <i class="fas fa-folder" v-show="historyMode"/>

                    {{historyMode?'Contents':'History'}}
                </button>
            </span>
        </div>
        <div class="flex-column" v-show="!loading&&!historyMode">

            <slot/>

        </div>
        <div class="flex-column" v-show="historyMode">
            <HistoryViewer
                :history="history"
                @getCommits="p => $emit('getCommits',p)"
            />
        </div>
        <div id="loading-div" 
            v-show="loading"
            class="flex-column justify-center align-center app-area"
        >
            <i class="fas fa-spinner spinner">

            </i>
            <p>
                Loading
            </p>
        </div>

    </div>

</template>

<script>
import HistoryViewer from '@/components/HistoryViewer.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
export default {
    components:{HistoryViewer,BreadCrumbs},
    props:['user','repository','loading','file','history'],
    data(){
        return {
            fileUrl:'',
            historyMode:false
        }
    },
    computed:{
        path(){
            return this.$route.path;
        }
    },
    watch:{
        file(){
            if(this.file){
                let data = atob(this.file.content) 
                let blob = new Blob([data], {type: "octet/stream"});
                this.fileUrl = window.URL.createObjectURL(blob);
                
                //this.fileUrl = this.file.download_url;
            }
        },
        $route(){
            this.historyMode = false;
        }
    }
}
</script>

<style>

#loading-div{
    height: 200px;
    border:1px solid var(--folder-border);
    border-radius: 4px;
    background-color: white;
}
#loading-div > i{
    font-size: 24px;
    color: lightslategray;

}
#user-area{
    box-sizing: border-box;
    width: 100%;
    margin: 0px;
    background-color: whitesmoke;
}
#user-area b{
    font-size: 14px;
}

</style>