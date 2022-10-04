export default{
template:`
<div style="height:90vh;overflow-y: auto;">

<v-card>
<v-toolbar color="#49bbe4"
flat>
<v-tabs v-model="tab" >
<v-tab class="headline font-weight-bold" >Profit or loss statement</v-tab>
<v-tab class="headline font-weight-bold" >Analysis</v-tab>
</v-tabs>
<v-spacer></v-spacer>
<v-btn  v-if="tab==1" class="pink dark-3 white--text text-right " @click="">
create new

</v-btn>


</v-toolbar>

<v-data-table :headers="headerA" v-if="tab==0" class=""   >

</v-data-table>



</v-card>

</div>
`,
name:'accounting',
    data(){
     return{
         tab:0,
         headerA:[{
             text:'Month',
             value:'date'
         },
         {
            text:'Total sales',
            value:'sales'
        },
        {
            text:'Total Expenses',
            value:'expense'
        },
        {
            text:'  Profit or Loss',
            value:'profit'
        },
        
        ]

     }
    },
    mounted(){
    

    },
    watcher:{},
    methods:{
        getProfitorloss(){
            await axios.post('api/profitorloss.php',
            {
             pro_data:{}
            }
            )
            .then(response=>{
               this.profit =response.data.data[0].profit
               this.loss =response.data.data[0].profit
               this.sales =response.data.data[0].profit
            })
            .catch(error=>{
                console.log(error)
            })
        }

      



    }
}


