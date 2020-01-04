<template>
    <div class="flex-column padding-8" style="text-align:left;">


        <div v-for="(h,k) in localHistory" :key="k" >
            <h5>
               Commits on {{k}}
            </h5>
            <div v-for="c in h" :key="c.id" class="commit-container">
                <p class="commit-message">
                    {{c.commit.message}} 
                </p>
                <span>
                    <b>
                        <small>

                        {{c.commit.committer.name}}
                        </small>
                    </b>
                    <p class="date">
                        committed on {{getDateString(c.commit.committer.date)}}
                    </p>
                </span>
            </div>
        </div>

            <!-- <div >
                <span>
                    <button v-for="(p,n) in pages" :key="n" 
                        :class="page==n?'primary':''"
                        @click="page=n"
                        class="page-button"
                    >
                        {{n+1}}
                    </button>
                </span>
            </div> -->

        <div class="flex-row justify-center margin-8 brow" v-if="history">
                <button @click="getPageRel(-1)" :disabled="history.page==1" >
                    older
                </button>
                <button style="color:black;">
                    <span v-show="!history.loading">
                        {{history.page}}
                    </span>
                    <span v-show="history.loading">
                        <i class="fas fa-circle-notch spinner" style="color:var(--blue)"/>
                    </span>
                </button>
                <button @click="getPageRel(1)" :disabled="history.page==history.pageMax">
                    newer
                </button>
        </div>
        
    </div>
</template>

<script>
export default {
    props:['history'],
    methods:{
        getDateString(dts){
            let dst =  new Date(dts).toDateString();
            let darr = dst.split(' ').slice(1);
            darr[1] += ','
            return darr.join(' ');
        },
        getPageRel(i){
            if(this.history.page+i < 1){return;}
            this.$emit('getCommits',(this.history.page+i));
        }
    },
    data(){
        return {
            page:0
        }
    },
    computed:{
        localHistory(){
            let hist = {}
            if(this.history){
                let commits = this.history.commits;
                commits.forEach(
                    c => {
                        let key = this.getDateString(c.commit.committer.date)
                        if(hist[key]){
                            hist[key].push(c)
                        }
                        else{
                            hist[key] = [c]
                        }
                    }
                )
            }
            return hist;
        },
        // pages(){
        //     let pages = []
        //     let commits = this.hisory.commits;
        //     if(commits){
        //         let pageSize = 50;
        //         let ind  =0;
        //         let len = commits.length;
        //         while(ind<len){
        //             pages.push(commits.slice(ind,ind+pageSize))
        //             ind += pageSize
        //         }
        //     }
        //     return pages;
        // }
    }
}
</script>

<style>
.commit-container{
    border-radius:4px;
    min-height: 80px;
    margin: 8px;
    padding: 8px;
    box-sizing: border-box;
    text-align: left;
    background-color: white;
    /* border: 1px solid rgb(233, 239, 248); */
    box-shadow: 2px 2px 4px rgb(218, 229, 245);
}
.date{
    display: inline;
    font-size: 12px;
}
.page-button{
    margin-right:4px;
}
.commit-message{
    font-size: 12px;
    word-wrap: break-word;
}
button:disabled{
    color: lightgray;
}
</style>