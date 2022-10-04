const Expenditure = () =>import('./management.js');
const Sales = () => import('./sales.js');
const Summary = () => import('./dash.js');
const Accounting = () => import('./accounting.js');
export default{
    name:'dashboard',
    components:{

        'expenditure':Expenditure,
        'sales':Sales,
        'dash':Summary,
        'accounting':Accounting,
    },
    data(){
        return{
            dashboardContainer:{
                height: '100vh', 
                background: 'rgb(169, 172, 177)',
                background: '-webkit-linear-gradient(right, #ECF0F5, #E0E0E0)',
                background: '-moz-linear-gradient(right, #ECF0F5, #E0E0E0)',
                background: '-o-linear-gradient(right, #ECF0F5, #E0E0E0)',
                background: 'linear-gradient(to left, #ECF0F5, #E0E0E0)',
                'font-family': '"Roboto", sans-serif',
                '-webkit-font-smoothing': 'antialiased',
                '-moz-osx-font-smoothing': 'grayscale' ,
                color:'blue',
            },
            page:'',
           

        };
    },
    mounted(){
        
    },
    watcher:{
       

    },
    methods:{
        selectMenu(data) {
            console.log(data)
            this.page = ''
            this.page = data
            console.log(this.page)
           
          },

    },

    template:`
    <div :style="dashboardContainer">    
   
  
     
    <div style="width:100%;height:100%;overflow: hidden;"> 
                      
             
            

            <v-app id="inspire">
            <v-navigation-drawer  app permanent expand-on-hover color="grey lighten-4" dark>

            <v-list nav class="text-left" class="mt-12" >
    
            <v-list-item-group active-class="indigo--text lighten-4 font-weight-bold">
            <v-list-item @click="selectMenu('dash')" >
            <v-list-item-icon >
                <v-icon color="indigo darken-3">dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="indigo--text darken-4 font-weight-bold" >Dashboard</v-list-item-title>
            </v-list-item>
    
               <v-list-item @click="selectMenu('sales')" >
                    <v-list-item-icon >
                        <v-icon color="indigo darken-3">payment</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="indigo--text darken-4 font-weight-bold" >Sales</v-list-item-title>
                </v-list-item>
                <v-list-item @click="selectMenu('expenditure')" >
                    <v-list-item-icon>
                        <v-icon color="indigo darken-3">description</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="indigo--text darken-4 font-weight-bold">Expenditure</v-list-item-title>
                </v-list-item>
                <v-list-item-group active-class="indigo--text lighten-4 font-weight-bold">
            <v-list-item @click="selectMenu( 'accounting')" >
            <v-list-item-icon >
                <v-icon color="indigo darken-3">dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="indigo--text darken-4 font-weight-bold" >Accounting</v-list-item-title>
            </v-list-item>
            </v-list-item-group>
        </v-list>
    
            </v-navigation-drawer>
            <v-main >
                <div style="overflow-y: auto;height:100vh;">
                  <auto-logout style="margin-left:80px;"></auto-logout>
                 
                  <component style="margin-left:70px;margin-right:20px;" v-bind:is="page"></component>
                  <br>
                </div>
            </v-main>
                     
      
   
   
   
</table>
    </div>
   
    
    `,

}