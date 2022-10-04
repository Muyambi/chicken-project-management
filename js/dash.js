export default{
    template:`
    <div style="height:90vh;overflow-y: auto;">
    
    <v-card>
    <v-toolbar color="#49bbe4"
    flat>
    <v-tabs v-model="tab" >
    <v-tab class="headline font-weight-bold" >SALES TABLE</v-tab>
    <v-tab class="headline font-weight-bold" >SALES MANEAGEMNT</v-tab>
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
                 title:'Month',
                 value:'date'
             },
             {
                title:'Total sales',
                value:'sales'
            },
            {
                title:'Total Expenses',
                value:'expense'
            }
            ]
    
         }
        },
        mounted(){
        
    
        },
        watcher:{},
        methods:{
    
          
    
    
    
        }
    }
    
    
    