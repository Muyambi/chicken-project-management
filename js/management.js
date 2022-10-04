export default{
    template:`
    <div style="height:90vh;overflow-y: auto;">
    <v-card 
    class="mt-10 mr-5 ml-5"
  >  
 
  <v-toolbar
  color="#49bbe4"
  flat

  >
  <v-tabs v-model="tab" >
     <v-tab class="headline font-weight-bold" >MANAGE HERE</v-tab>
    
    </v-tabs>
<v-spacer></v-spacer>

<div style="width:400px">
  <v-text-field
    class="mr-3 mt-7"
    v-model="searchText"
    outlined
    append-icon="search"
    dense
    @keydown.enter="searchFunction"
    :placeholder="selectedSearchMenuText"
  ></v-text-field>
</div>

<v-btn class="pink dark-3 white--text" @click="createDialog">Add an expense</v-btn>
  </v-toolbar>

   
  <v-spacer></v-spacer>


    <v-data-table
    :items="expenses"
    :headers="headers"
    :items-per-page="15"     
    class="elevation-7"   
    :search="search"
    >    
    
    </v-data-table>

    
    <v-navigation-drawer v-model="drawer" app class="grey-light"> 
    
    </v-navigation-drawer>
  
  

    </v-card>
    <v-dialog v-model="dialogAddExpense"
    persistent
    width="600"
    class="pb-12"
    
        >      
      <v-card>
        <v-card-title
          class="headline lime  black--text"
          primary-title          
        >
          Expense Addition Form
          <v-spacer></v-spacer>
          <v-btn
    class="success ml-3 mb-1"
    @click="addExpense"
    >
    Save
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
    class="error mr-3 mb-1"
    @click="dialogAddExpense=false"
    >
    Close
    </v-btn>   
        </v-card-title>
      <v-spacer></v-spacer>
    <v-text-field
    label="Expense name"
    v-model="expense.name"
    outlined
    >
    </v-text-field>

    <v-text-field
    label="Expense Amount"
    v-model="expense.amount"
    outlined
    >
    </v-text-field>
    <v-select
    label="Select the expense type"
    outlined
    v-model="expense.type"
    
    :items="expenseTypes"
    item-text="name"
    item-value="id"
    >
    </v-select>

    <v-text-field
    v-if="expense.type==1"
    label="Number of Chicks Bought"
    v-model="chick.number"
    outlined
    >
    </v-text-field>

    <v-text-field
    v-if="expense.type==1"
    label="Breed"
    v-model="chick.breed"
    outlined
    >
    </v-text-field>

    <v-text-field
    v-if="expense.type==2"
    label="Feed name"
    v-model="feed.name"
    outlined
    >
    <v-text-field
    v-if="expense.type==2"
    label="Total Feed weight"
    v-model="feed.weight"
    outlined
    >
    </v-text-field>
   <v-card-actions>
    
    </v-card-actions>
    </v-card> 
    </v-dialog>
   
    </div>
    

    `,
    name:'management',
   
    data(){
       return{
         drawer:false,
           search:'',
          searchText:'',
           selectedSearchMenuText:'search by expense id',
           searchItems:[
             {id:1,
              text:'search by expense id'
             },
           {id:2,
            text:'search by expense name'
           },
         {id:3,
          text:'search by expense date'
         },
      ],
           chick:{
             breed:'',
             number:''
           },
           feed:{
             name:'',
             weight:null
           },
           tab:0,
           headers:[
                 {
                     align:"start"
                 },
               {
                   text:'Date',
                   value:'createdAt'
               },
               {
                text:'expense ID',
                value:'expenseID'
            },
               {
                   text:'expense name',
                   value:'expenseName'                  

               },
               {
                   text:'expense value',
                   value:'amount'
               },
               {
                text:'expense status',
                value:'expenseType'
            }
           ],
           expenses:[],
           userID:'',
           dialogAddExpense:false,
           expense:{
             name:'',
             ID:'',
             amount:null,
             type:null

           },
           expenseTypes:[],
       };
      

    },
    mounted(){
       this.getExpenses()
       this.getExpenseTypes()
    },
    watch:{
      dialogAddExpense(val){
        if(val){
          this.expense={
            name:'',
            amount:null,
            type:null,
          }
        }
      }

    },
    methods:{
      checkType(data){
        if(data==1)
        {
          return 'capital expenditure'
        }
        if(data==2)
        {
          return 'revenue expenditure'
        }

      },
        searchFunction(){
          console.log("i am a bulluy")
        },
        createDialog(){
          console.log("i am a bulluy")
          this.dialogAddExpense=true
        },
        async getExpenses(){
          await axios.post('api/getExpenses.php',
          {
            //userID : this.$session.get('user').userID,
            function_type:'read',
            expense_data:{}
          })
          .then(response=>
            {
              this.expenses =response.data.data
              console.log(this.expenses)
            }

          )
          .catch(error=>{
            console.log(error)
          })

        },
        async getExpenseTypes(){
          await axios.post('api/getExpenseType.php',
          {
            //userID : this.$session.get('user').userID,
            function_type:'read',
            expense_data:{}
          })
          .then(response=>
            {
              this.expenseTypes =response.data.data
              console.log(this.expenses)
            }

          )
          .catch(error=>{
            console.log(error)
          })

        },
        async addExpense(){
          console.log(this.expense.type)
          if(this.expense.name==''){
            Swal.fire(
              'Exepense adding failed',
              'Input a valid expense name',
              'error'
            )
          }
          
          else if(Number(this.expense.amount)<=0){
            Swal.fire(
              'Exepense adding failed',
              'Input a valid expense amount',
              'error'
            )
          }
          else{
            console.log(this.chick.number)
            await axios.post('api/expense.php',
            {
              
             // userID:this.$session.get('user').userID,
                                 
              expense_data:{
                name:this.expense.name,                
                amount:this.expense.amount,
                type:this.expense.type,
                breed:this.chick.breed,
                Cnumber:this.chick.number,
                Fname:this.feed.name,
                Fweight:this.feed.weight
              }
            })
            .then(res=>
              {
                if(res.data.status==='success'){
                  Swal.fire(
                    'Exepense adding Succeeded',
                    'You have successfully inserted a new expense',
                    'success'
                  )
                  this.getExpenses()
                  this.dialogAddExpense=false
                }
                else{
                  Swal.fire(
                    'Expense adding failed',
                    res.data.message,
                    'error'
                  )
                  
                }
              })
              .catch(error=>{
                console.log(error)
              })
              
          }

        },

    }
}