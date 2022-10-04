export default{
    template:` <div style="height:90vh;overflow-y: auto;">
     <v-card
     class="mt-10 mr-5"
     >

     <v-toolbar color="#49bbe4"
     flat>
     <v-tabs v-model="tab" >
     <v-tab class="headline font-weight-bold" >SALES TABLE</v-tab>
     <v-tab class="headline font-weight-bold" >SALES MANEAGEMNT</v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
    <v-btn  v-if="tab==1" class="pink dark-3 white--text text-right " @click="dialogCreate=true">
    create new
   
    </v-btn>
   
   
     </v-toolbar>

     <v-data-table :items="sales"  :headers="headerB" v-if="tab==0" class=""   >
     
     </v-data-table>

     <div class="page" v-if="tab==1">
     <h1 display="4" class="grey--text darken-2 text-right pr-5 mr-15">Batch Number: {{batchNumber}}</h1>

     <v-data-table :items="salesTransactions"  :headers="headerA" class=" "   >

     
  
     
     </v-data-table>
     <v-btn class="blue mt-5 ml-10 mb-4 white--text text-right " @click="dialogEdit=true">
     edit 
      </v-btn>
     
     </div>
      
     <v-dialog 
          color="black" v-model="dialogEdit"
          persistent
           width="800">

            
            <v-card
            class="grey lighten-2"
            >
                        
            <v-card-text
            class="primary--text headline font-weight-bold"
            persistent
            style="cursor:pointer;"
            >
            <v-icon color="primary">edit</v-icon>Edit existing 
            </v-card-text>
            <v-card-text
            class="error--text headline font-weight-bold"
            style="cursor:pointer;"
            >
                <v-icon color="error">delete</v-icon>Delete existing 
            </v-card-text>

            <v-card-text
            class="error--text headline font-weight-bold"
            @click="dialogEdit=false"     
            style="cursor:pointer;"
        >
        <v-icon color="error">close</v-icon> Close 
        </v-card-text>
            </v-card>
       
     </v-dialog>



        <v-dialog
                v-model="dialogCreate"
                persistent
                width="800">

            
            <v-card
                class="grey lighten-2"    
            >
           
            <v-card-title
                class="primary--text headline font-weight-bold"
                style="cursor:pointer;"
                persistent
                @click="showDialogNewSale()"
                
            >
                        
            Create New Expense 

            </v-card-title>



            <v-card-text
            class="success--text headline font-weight-bold"
            style="cursor:pointer;"
            @click="showDialogConfirm"
            >
                            
                Save Batch data 

            </v-card-text>

            <v-spacer></v-spacer>


            <v-card-text
                class="error--text headline font-weight-bold"
                @click="dialogCreate=false"     
                style="cursor:pointer;"
                
            >
            Close 
            </v-card-text>
            </v-card>
            
        </v-dialog>
    
        <v-dialog
          v-model="dialogNewSales"
          persistent
          width="300"
          
        >
          <v-card
          
          >
           <v-card-title
           class="headline lime  black--text"
           primary-title 
          
           >Create a new sales</v-card-title>
           <v-text-field
           label="Enter the total number of chickens sold"
             v-model="sale.numSold"            
             outlined
           >
           
           </v-text-field>

           <v-text-field
             v-model="sale.amtSold"
             label="Enter the total sales amount"
             outlined
           >
           
           </v-text-field>

           <v-card-actions>
           <v-spacer></v-spacer>
           
           <v-btn
             color="error"
             @click="dialogNewSales=false"
           >
             Close
           </v-btn>
           <v-btn
            color="success"
             @click="saveSales()"
             dark
           >
             Save
           </v-btn>
          </v-card-actions>
          </v-card>
        
        </v-dialog>

        <v-dialog
        v-model="confirmDialog"
        persistent
        width="300"
        >

        <v-card>
        <v-icon>confirm</v-icon>
        <v-card-text>Are you sure you want to save batch data</v-card-text>
        <v-card-actions>
        <v-btn
        class="orange white--text"
        @click="getBatchNumber()"
        >YES</v-btn>
        <v-btn
        @click="confirmDialog=false"
        class="error white--text"
        >NO</v-btn>
        </v-card-actions>
        </v-card>
        </v-dialog>

        <v-dialog
        v-model="getBatchIDdialog"        
        persistent        
        width="400">
        
        <v-card>
        
        <v-card-text>Confirm batch data</v-card-text>
        <v-text-field
        v-model="batchNumber"
        label="enter the batch information here"
        :rules="confirmRule"
        ></v-text-field>
        <v-card-actions>
        <v-btn
        class="success white--text"
        @click="saveBatch"
        >
        Save
        </v-btn>
        <v-btn
        class="error white--text"
        @click="getBatchIDdialog=false"
        >
        Close
        </v-btn>
        </v-card-actions>
        </v-card>
      
        </v-dialog>
     
     </v-card>
  
    
    </div>   
    `,
    name:'sales',
    data(){
        return{
            totalExpenses:null,
            dialogNewSales:false,
            dialogEdit:false,
            dialogCreate:false,
            confirmDialog :false,
            tab:0,
            batchNumber:'',
            headerA:[
                {text:'Date', value:'createdAT'},
                {text:'Total Sold', value:'totalSold'},
                {text:'Total Sales Amount' ,value:'amount'}
            ],
            confirmRule:[
                v => v.length<0||'Make sure you are inputig the correct batch id there is no way to reverse it'
             ],
            headerB:[
                {text:'Batch ID',value:'batchID'},
                {text:'Total bought',value:'chicksBought'},
                {text:'Total sold',value:'chicksSold'},
                {text:'Total Sales Amount',value:'salesAmtValus'},
                {text:'actions',value:'edit'}
            ],
            sales:[],
            salesTransactions:[],
            dialogSelect:false,
            getBatchIDdialog:false,
            sale:{
                numSold:null,
                amtSold:null
            },
            totalSales:null,
            totalSalesAmt:null,
        };
    },
    mounted(){
        this.getSales()
        this.getSalesTransact()

    },
    watcher:{},
    methods:{

        showDialogNewSale(){
            this.dialogNewSales=true
            this.dialogCreate=false
        },
        async saveSales(){
            if(Number(this.sale.amtSold<=0)){
                Swal.fire(
                    'Sales saving failed',
                    'Input the total sales amount',
                    'error'
                )

            }
            else if(Number(this.sale.numSold<=0)){
                Swal.fire(
                    'Sales saving failed',
                    'Input the number of chickens sold',
                    'error'
                )

            }
            else{          
               await axios.post("api/sales.php",{
                function_type:"createsale",
                sale_data:{
                    totalSold:this.sale.numSold,
                    amtSold:this.sale.amtSold
                }
            })
            .then(response => {
                if(response.data.status=="success"){
                    Swal.fire(
                        'Sales saving successfull',
                        'You have successfully added a new sale',
                        'success'
                    )}
                else{
                    Swal.fire(
                        'Sales saving failed',
                        response.data.message,
                        'error'
                    )}

            })
            .catch(error=>{
                console.log(error)

            });
}
        },
        showDialogConfirm(){

            this.confirmDialog = true
           
        },
        getBatchNumber(){
            this.dialogNewSales=false
            this.confirmDialog = false
            this.dialogCreate=false
            this.getBatchIDdialog = true

        },
        async getSales(){
            await axios.post('api/sales.php',{
                function_type:'getsales',
                sales_data:{},

            })
            .then(response=>{
               this.sales = response.data.data
               console.log(this.sales),
               console.log(32)
            })
            .catch(erro=>{
                console.log(erro)
            })

        },
       
        async saveBatch(){
           
            this.getBatchSum()
            this.getExpenseTotal()
            await axios.post('api/sales.php',
            {
                function_type:'savebatchS',
                sale_data:{   
                    totalSales:this.totalSales,
                    totalSalesAmt:this.totalSalesAmt,
                    totalExpense:this.totalExpenses,
                    batchNum :this.batchNumber            
                }
            })
            .then(response=>{               
                if(response.status.success){
                    this.getBatchIDdialog=false
                    Swal.fire(
                        'Batch saved',
                        'successfully saved the new batch',
                        'success'
                    )
                   
                }
                else{
                    Swal.fire(
                        'Batch data saving failed',
                        response.data.message,
                        'error'
                    )

                }
            })
            .catch(err=>{
                console.log(err)
            })

        },
        async getBatchSum(){
            await axios.post('api/sales.php',
            {
                function_type:'getbatchS',
                sale_data:{ 
                 batchNum :this.batchNumber               
                }
               
            })
            .then(response=>{
                console.log(response.data.data[0])
                console.log(response.data.data[0].amt)
                this.totalSales = parseFloat(response.data.data[0].total).toFixed(2)
                this.totalSalesAmt = parseFloat(response.data.data[0].amt).toFixed(2)
            })
            .catch(error=>{
                console.log(error)
            })

        },
        async getExpenseTotal(){
            await axios.post('api/sales.php',
            {
                function_type:'getbatchE',
                sale_data:{ 
                 batchNum :this.batchNumber               
                }
               
            })
            .then(response=>{
                console.log(response.data.data[0])
                console.log(response.data.data[0].amt)
               
                this.totalExpenses = parseFloat(response.data.data[0].amount).toFixed(2)
            })
            .catch(error=>{
                console.log(error)
            })
            
        },


        async getSalesTransact(){
            await axios.post('api/sales.php',{
                function_type:'getsalesT',
                sales_data:{},

            })
            .then(response=>{
               this.salesTransactions = response.data.data
               console.log( this.salesTransactions),
               console.log(32)
            })
            .catch(erro=>{
                console.log(erro)
            })

        },



    }
}