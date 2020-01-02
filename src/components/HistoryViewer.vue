<template>
    <div class="flex-column app-area" style="text-align:left;">


        <div v-for="(h,k) in history" :key="k" >
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

            <div v-if="pages.length>1">
                <span>
                    <button v-for="(p,n) in pages" :key="n" 
                        :class="page==n?'primary':''"
                        @click="page=n"
                        class="page-button"
                    >
                        {{n+1}}
                    </button>
                </span>
            </div>
        
    </div>
</template>

<script>
export default {
    props:['commits'],
    methods:{
        getDateString(dts){
            let dst =  new Date(dts).toDateString();
            let darr = dst.split(' ').slice(1);
            darr[1] += ','
            return darr.join(' ');
        }
    },
    data(){
        return {
            page:0
        }
    },
    computed:{
        history(){
            let hist = {}
            let commits = this.pages[this.page]
            if(commits){
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
        pages(){
            let pages = []
            if(this.commits){
                let pageSize = 50;
                let ind  =0;
                let len = this.commits.length;
                while(ind<len){
                    pages.push(this.commits.slice(ind,ind+pageSize))
                    ind += pageSize
                }
            }
            return pages;
        }
    }
}
</script>

<style>
.commit-container{
    border: 1px solid var(--folder-border);
    border-radius:4px;
    min-height: 80px;
    margin: 8px;
    padding: 0 8px;
    box-sizing: border-box;
    text-align: left;
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
</style>