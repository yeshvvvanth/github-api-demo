<template>
    <div class="flex-column app-area" style="text-align:left;">


        <div v-for="(h,k) in history" :key="k" >
            <h5>
               Commits on {{k}}
            </h5>
            <div v-for="c in h" :key="c.id" class="commit-container">
                <p>
                    <b>

                    {{c.commit.message}} 
                    </b>
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
    computed:{
        history(){
            let hist = {}
            if(this.commits){
                this.commits.forEach(
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
        }
    }
}
</script>

<style>
.commit-container{
    border: 1px solid var(--folder-border);
    border-radius:4px;
    height: 80px;
    margin: 8px;
    padding: 0 8px;
    box-sizing: border-box;
    text-align: left;
}
.date{
    display: inline;
    font-size: 12px;
}
</style>