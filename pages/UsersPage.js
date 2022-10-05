const Loader = () => import('../Loader.js');
export default { 
    props: ['displayStatus','loadType'],   
    template: `
    <div style="height:90vh;overflow-y: auto;">
          
          <v-card 
            class="mt-10 mr-5 ml-5"
          >
          <v-toolbar
          color="indigo darken-4"
          dark
          flat
        >
        <v-tabs v-model="tab">
          <v-tab>Members</v-tab>
          <v-tab>Non-Members</v-tab>
          <v-tab>Employees</v-tab>
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

          <v-menu offset-y>
          <template v-slot:activator="{ on }">
          <v-btn class="mr-3" v-on="on" outlined color="white">Search Options</v-btn>                               
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in search_items"
              :key="index"
              @click="menuClick(item)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

          <v-btn class="mr-3" color="red" dark @click="createMember" v-if="tab == 0">Create Member</v-btn> 


          <v-btn v-if="tab == 0"  color="primary" class="white--text" @click="$refs.doc.click()">
              Upload CSV
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
          <input type="file" ref="doc" accept=".csv" @change="uploader" style="display: none">


          <v-btn class="mr-3" color="red" dark @click="createMember" v-if="tab == 1">Create Non Member</v-btn> 
          <v-btn class="mr-3" color="red" dark @click="createMember" v-if="tab == 2">Create Employee</v-btn> 

          <v-tooltip bottom v-if="tab == 0">
          <template v-slot:activator="{ on }">
            <v-btn icon @click="exportExcel()">
            <v-icon v-on="on" color="red">library_add</v-icon>
                
            </v-btn>
          </template>
          <span>Export Members List</span>
        </v-tooltip>

        <v-tooltip bottom v-if="tab == 1">
        <template v-slot:activator="{ on }">
          <v-btn icon @click="exportExcel2()">
          <v-icon v-on="on" color="red">library_add</v-icon>
              
          </v-btn>
        </template>
        <span>Export Non Members List</span>
      </v-tooltip>

      <v-tooltip bottom v-if="tab == 2">
      <template v-slot:activator="{ on }">
        <v-btn icon @click="exportExcel3()">
        <v-icon v-on="on" color="red">library_add</v-icon>
            
        </v-btn>
      </template>
      <span>Export Employee List</span>
    </v-tooltip>
          
        </v-toolbar>
       
             

              <v-data-table :headers="headers" :items="members" :search="search" :items-per-page="15" v-if="tab == 0">
                <template v-slot:item.status="{ item }">
                    {{statusCheck(item.status)}}
                </template>
                  <template v-slot:item.actions="{ item }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="mr-2" @click="editDetails(item)" color="#003263" v-bind="attrs" v-on="on">
                                edit
                            </v-icon>
                        </template>
                        <span>Edit Details</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="userType.includes('7')">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="mr-2" @click="editAuth(item)" color="green" v-bind="attrs" v-on="on">
                                add
                            </v-icon>
                        </template>
                        <span>Edit Authorizations</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="userType.includes('7')">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="mr-2" @click="restPassword(item)" color="red" v-bind="attrs" v-on="on">
                            vpn_key
                            </v-icon>
                        </template>
                        <span>Rest Password</span>
                    </v-tooltip>
                    

                </template>
               
            </v-data-table>

            <v-data-table :headers="headers" :items="nonmembers" :search="search" :items-per-page="15" v-if="tab == 1">
                <template v-slot:item.status="{ item }">
                    {{statusCheck(item.status)}}
                </template> 
                <template v-slot:item.actions="{ item }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="mr-2" @click="editDetails(item)" color="#003263" v-bind="attrs" v-on="on">
                                edit
                            </v-icon>
                        </template>
                        <span>Edit Details</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="userType.includes('7')">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="mr-2" @click="editAuth(item)" color="green" v-bind="attrs" v-on="on">
                                add
                            </v-icon>
                        </template>
                        <span>Edit Authorizations</span>
                    </v-tooltip>
                    

                </template>
              
            </v-data-table>

            <v-data-table :headers="headers" :items="employees" :search="search" :items-per-page="15" v-if="tab == 2">
               
                <template v-slot:item.status="{ item }">
                   {{statusCheck(item.status)}}
                </template> 
            <template v-slot:item.actions="{ item }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="mr-2" @click="editDetails(item)" color="#003263" v-bind="attrs" v-on="on">
                                edit
                            </v-icon>
                        </template>
                        <span>Edit Details</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="userType.includes('7')">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="mr-2" @click="editAuth(item)" color="green" v-bind="attrs" v-on="on">
                                add
                            </v-icon>
                        </template>
                        <span>Edit Authorizations</span>
                    </v-tooltip>
                </template>
            </v-data-table>
          </v-card>
          <br>
          <br>


          <v-dialog
                v-model="dialogMyProfileAdd"
                persistent
                width="800"
                    >      
                  <v-card>
                    <v-card-title
                      class="headline indigo darken-4 white--text"
                      primary-title          
                    >
                      Personal Profile Form Add
                      <v-spacer></v-spacer>
                      
                    </v-card-title> 
                    <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        
                          <v-select
                          v-model="profile.salutation"
                          outlined
                          :items="salutations"
                          label="Salutations"
                          item-text="name"
                          item-value="salutationsID"
                        ></v-select>
                          
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                          <v-text-field
                          label="First Name"
                          v-model="profile.firstName"
                          outlined
                          ></v-text-field>
                          
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                          <v-text-field
                          
                          label="Middle Name"
                          v-model="profile.middleInital"
                          outlined
                          ></v-text-field>
                          
                      </v-col>

                      <v-col
                        cols="12"
                        md="3"
                      >
                          <v-text-field
                          
                          label="Last Name"
                          v-model="profile.lastName"
                          outlined
                          ></v-text-field>
                          
                      </v-col>
                      <v-col
                        cols="12"
                        md="6"
                      
                      >
                          <v-text-field
                          
                          label="Email Address"
                          v-model="profile.email"
                          outlined
                          ></v-text-field>
                          
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                        
                      >
                          <v-text-field
                          
                          label="National ID"
                          v-model="profile.nationalID"
                          outlined
                          ></v-text-field>
                          
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                      >
                      <v-select
                      v-model="profile.gender"
                      outlined
                      :items="gender"
                      item-text="name"
                      item-value="genderID"
                      label="Gender"
                    ></v-select>
                          
                      </v-col>

                     

                      <v-col
                        cols="12"
                        md="6"
                      >
                          <v-text-field
                          type="date"
                          label="Date of birth"
                          v-model="profile.dateOfBirth"
                          outlined
                          ></v-text-field>
                          
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                        
                      >
                          <v-text-field
                          label="Subscription Amount"
                          v-model="profile.sub_amount"
                          outlined
                          type="number"
                          ></v-text-field>
                          
                      </v-col>
                      <v-col
                        cols="12"
                        md="6"
                        
                      >
                          <v-text-field
                          label="Joining Fee Amount"
                          v-model="profile.join_amount"
                          outlined
                          type="number"
                          ></v-text-field>
                          
                      </v-col>

                      

                      </v-row>

                      </v-container>

                    
                    <v-card-actions>
                      <v-spacer></v-spacer>
                     
                      <v-btn
                        color="error"
                        @click="dialogMyProfileAdd=false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="indigo darken-3"
                        @click="saveUser"
                        dark
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  </v-dialog>




                  <v-dialog
                  v-model="dialogMyProfile"
                  persistent
                  width="800"
                      >      
                    <v-card>
                      <v-card-title
                        class="headline indigo darken-4 white--text"
                        primary-title          
                      >
                        Personal Profile Form
                        <v-spacer></v-spacer>
                        RID : {{profile.ruzhowaID}}
                      </v-card-title> 
                      <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          md="3"
                        >
                          
                            <v-select
                            v-model="profile.salutation"
                            outlined
                            :items="salutations"
                            label="Salutations"
                            item-text="name"
                            item-value="salutationsID"
                          ></v-select>
                            
                        </v-col>
                        <v-col
                          cols="12"
                          md="3"
                        >
                            <v-text-field
                            label="First Name"
                            v-model="profile.firstName"
                            outlined
                            ></v-text-field>
                            
                        </v-col>
                        <v-col
                          cols="12"
                          md="3"
                        >
                            <v-text-field
                            
                            label="Middle Name"
                            v-model="profile.middleInital"
                            outlined
                            ></v-text-field>
                            
                        </v-col>

                        <v-col
                          cols="12"
                          md="3"
                        >
                            <v-text-field
                            
                            label="Last Name"
                            v-model="profile.lastName"
                            outlined
                            ></v-text-field>
                            
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        
                        >
                            <v-text-field
                            
                            label="Email Address"
                            v-model="profile.email"
                            outlined
                            ></v-text-field>
                            
                        </v-col>

                        <v-col
                          cols="12"
                          md="6"
                          
                        >
                            <v-text-field
                            
                            label="National ID"
                            v-model="profile.nationalID"
                            outlined
                            ></v-text-field>
                            
                        </v-col>

                        <v-col
                          cols="12"
                          md="3"
                        >
                        <v-select
                        v-model="profile.gender"
                        outlined
                        :items="gender"
                        item-text="name"
                        item-value="genderID"
                        label="Gender"
                      ></v-select>
                            
                        </v-col>

                        <v-col
                          cols="12"
                          md="3"
                        >
                        <v-select
                        v-model="profile.status"
                        outlined
                        :items="statusData"
                        item-text="name"
                        item-value="memberStatusID"
                        label="Status"
                      ></v-select>
                          
                      </v-col>

                        <v-col
                          cols="12"
                          md="6"
                        >
                            <v-text-field
                            type="date"
                            label="Date of birth"
                            v-model="profile.dateOfBirth"
                            outlined
                            ></v-text-field>
                            
                        </v-col>

                        <v-col
                        cols="12"
                          md="12"
                        >
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Street
                                </th>
                                <th class="text-left">
                                  City
                                </th>
                                <th class="text-left">
                                  Country
                                </th>
                                <th class="text-left">
                                  Zip Code
                                </th>
                                <th class="text-center">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="item in addesses"
                                :key="item.name"
                              >
                                <td>{{ item.street }}</td>
                                <td>{{ item.city }}</td>
                                <td>{{ item.country }}</td>
                                <td>{{ item.zipcode }}</td>
                                <td class="text-right">
                                    <v-btn
                                    @click="editAddress(item)"
                                    icon
                                    color="blue"
                                    >
                                    <v-icon>edit</v-icon>
                                  </v-btn>
                                  <v-btn
                                  icon
                                  @click="deleteAddress(item)"
                                  color="red"
                                  >
                                  <v-icon>delete</v-icon>
                                </v-btn>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        </v-col>

                        </v-row>

                        </v-container>

                      
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green"
                          dark
                          @click="addNewAddress"
                        >
                          Add Address
                        </v-btn>
                        <v-btn 
                          color="error"
                          @click="dialogMyProfile=false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="indigo darken-3"
                          @click="updateProfile"
                          dark
                        >
                          Update
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                    </v-dialog>

      
    <v-dialog
    v-model="dialogAddress"
    persistent
    width="500"
        >      
      <v-card>
        <v-card-title
          class="headline indigo darken-4 white--text"
          primary-title          
        >
          {{addressForm}}
        </v-card-title>  

        <v-text-field
          class="mt-5 mr-5 ml-5"
          label="Home Address"
          v-model="address_data.street"
          type="text"
          outlined
          ></v-text-field>

          <v-combobox
                                  class="mr-5 ml-5"
                                  v-model="address_data.country"
                                  :items="countries"
                                  item-text="name"
                                  item-value="id"
                                  @input="selectedCountry"
                                  outlined
                                  label="Select Country">
                                  <template slot="item" slot-scope="data">
                                  <span style="font-size:30px;margin-right:15px;">{{data.item.emoji}}</span> {{data.item.name}}
                                  </template>
                          </v-combobox>

                          <v-combobox
                          class="mr-5 ml-5"
                          v-model="address_data.provinceOrState"
                          :items="states"
                          item-text="name"
                          item-value="id"
                          @input="selectedState"
                          outlined
                          label="Select Province or State">
                          <template slot="item" slot-scope="data">
                          <span style="font-size:30px;margin-right:15px;">{{data.item.emoji}}</span> {{data.item.name}}
                          </template>
                  </v-combobox>

                  <v-combobox
                                  class="mr-5 ml-5"
                                  v-model="address_data.city"
                                  :items="cities"
                                  @input="selectedCity"
                                  item-text="name"
                                  item-value="id"
                                  outlined
                                  label="Select City">
                                  <template slot="item" slot-scope="data">
                                  <span style="font-size:30px;margin-right:15px;">{{data.item.emoji}}</span> {{data.item.name}}
                                  </template>
                          </v-combobox>

                          <v-text-field
                          class="mr-5 ml-5"
                          label="Zip Code"
                          v-model="address_data.zipcode"
                          type="number"
                          outlined
                        ></v-text-field>


                        <v-text-field
                        class="mr-5 ml-5"
                        label="Zimbabwe Home Address"
                        v-model="address_data.zimstreet"
                        type="text"
                        outlined
                        ></v-text-field>


                        <v-combobox
                                  class="mr-5 ml-5"
                                  v-model="address_data.zimprovinceOrState"
                                  :items="zim_provs"
                                  item-text="name"
                                  item-value="id"
                                  @input="selectedStateZim"
                                  outlined
                                  label="Select Province or State">
                                  <template slot="item" slot-scope="data">
                                  <span style="font-size:30px;margin-right:15px;">{{data.item.emoji}}</span> {{data.item.name}}
                                  </template>
                          </v-combobox>

                          <v-combobox
                          class="mr-5 ml-5"
                          v-model="address_data.zimcity"
                          :items="zim_cities"
                          item-text="name"
                          @input="selectedCityZim"
                          item-value="id"
                          outlined
                          label="Select City">
                          <template slot="item" slot-scope="data">
                          <span style="font-size:30px;margin-right:15px;">{{data.item.emoji}}</span> {{data.item.name}}
                          </template>
                  </v-combobox>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  
                  <v-btn
                    color="error"
                    @click="dialogAddress=false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    v-if="editaddress == -1"
                    color="indigo darken-3"
                    @click="saveAddress"
                    dark
                  >
                    Save
                  </v-btn>
                  <v-btn
                  v-if="editaddress == 1"
                  color="indigo darken-3"
                  @click="updateAddress"
                  dark
                >
                  Update
                </v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>

          <v-dialog
          v-model="dialogAuth"
          persistent
          width="500"
              >      
            <v-card>
              <v-card-title
                class="headline indigo darken-4 white--text"
                primary-title          
              >
                Authorization Form
                <v-spacer></v-spacer>
                <v-btn class="mr-3" color="red" dark @click="dialogAuth = false">Close</v-btn>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="green"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Add
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in items"
                      :key="index"
                      link
                    >
                      <v-list-item-title @click="addAuthItem(item.userTypeID)">{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu> 
              </v-card-title> 
                         <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">
                                    Authorization
                                  </th>
                                  <th class="text-left">
                                    Action
                                  </th>
                                  
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="item in authorizations"
                                  :key="item.id"
                                >
                                  <td>{{ item.name }}</td>
                                  <td class="text-right">
                                    
                                    <v-btn
                                    icon
                                    @click="deleteAuth(item)"
                                    color="red"
                                    >
                                    <v-icon>delete</v-icon>
                                  </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                        </v-simple-table>
            </v-card>
          </v-dialog>



        <v-dialog v-model="dialogUpload" width="1050">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                <span class="headline">Uploaded CSV File</span>
                <v-spacer></v-spacer>
                <v-btn class="mr-5" @click="save" color="primary">Save</v-btn>
                <v-btn @click="dialogUpload = false" dark color="red">Cancel</v-btn>

            </v-card-title>
            <v-flex pa-3>

                <v-simple-table fixed-header height="400">
                    <template v-slot:default>
                        <thead style="overflow-y: scroll;overflow-x: hidden;">
                            <tr>
                                <th class="text-left">Ruzhowa ID</th>
                                <th class="text-left">Full Name</th>
                                <th class="text-left">Email Address</th>
                                <th class="text-left">National ID</th>
                                <th class="text-left">Date of birth</th>
                                <th class="text-left">Primary No.</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in csvDataMain" :key="item.ruzhowaID">
                                <td>
                                    {{ item.ruzhowaID }}
                                </td>

                                <td>
                                    {{ item.firstName }} {{ item.middleInital }} {{ item.lastName }}
                                </td>
                                <td>{{ item.email }}</td>
                                <td>{{ item.nationalID }}</td>
                                <td>{{ item.dateOfBirth }}</td>
                                <td>{{ item.primary_phone }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>

                <br>
               
            </v-flex>
            <v-card-text>

            </v-card-text>
        </v-card>
    </v-dialog>

    <v-dialog
    v-model="dialogLoader"
    hide-overlay
    persistent
    width="300"
    
  >
    <v-card
      color="indigo darken-4"
      dark
      
    >
      <v-card-text>
      <br>
        Please stand by
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
        <br>
      </v-card-text>
    </v-card>
  </v-dialog>

    </div>
    `,
    name: 'UsersPage',
    components: {
      Loader,
      
    },  
    data() {
      return {
        dialogUpload:false,
        tab:0,
        dialogLoader:false,
        items: [
          {id:1, name: 'Member' },
          
        ],
        searchText:'',
        search_items:[{id:1,title:'By Ruzhowa ID'},{id:2,title:'By National ID'},{id:3,title:'By Date of Birth'},{id:4,title:'First Name'},{id:5,title:'Last Name'}],
        authorizations:[],
        dialogAuth:false,
        status: 'flex',  
        search:'',
        salutations:[],
        gender:[],
        statusData:[],
        loader : 'none',
        loadType:'',
        dialogAddress:false,
        dialogMyProfile:false,
        dialogMyProfileAdd:false,
        profile:{
          salutation:'',
          middleInital:'',
          firstName:'',
          lastName:'',
          email:'',
          gender:'',
          dateOfBirth:'',
          nationalID:'',
          sub_amount:null,
          join_amount:null
        },
        addressForm:'',
        editaddress:-1,
        address_data:{
          country:'',
          zipcode:'',
          provinceOrState:'',
          city:'',
          street:'',
          zimprovinceOrState:'',
          zimcity:'',
          zimstreet:'',
      },
      selectedAddressID:'',
        countries:[],
        cities:[],
        states:[],
        zim_provs:[],
        zim_cities:[],
        addesses:[],
        headers: [
           
            {
                text: 'Ruzhowa ID',
                value: 'ruzhowaID'
            },
            {
                text: 'First Name',
                value: 'firstName'
            },
            {
                text: 'Last Name',
                value: 'lastName'
            },
            {
                text: 'Date of Birth',
                value: 'dateOfBirth'
            },
            {
                text: 'National ID',
                value: 'nationalID'
            },
            {
                text: 'Email Address',
                value: 'email'
            },
            {
                text: 'Status',
                value: 'status'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            }
        ],
        members: [], 
        nonmembers:[],
        employees:[],    
        selected_ruzhowa_id:'' ,
        userType:'',
        selectedSearchMenu:1,
        selectedSearchMenuText:'By Ruzhowa ID',
        csvData: [],
        csvDataMain: [],
        csvDataAddress:[],
        loader: null,
        loading3: false,
        files: '',
        fileName: '',
        member_query:'',
        address_query:'',
        member_type_query:''
      }
    },
    mounted() {
      this.userType = this.$session.get('user').userTypes
      // this.getMembers()
      // this.getEmployees()
      // this.getNonMembers()
      this.getGenders()
      this.getStatus()
      this.getSalutations()
      this.countryData()
      this.getUserTypes()
    },
    watch: {
      tab(val){
        // this.getMembers()
        // this.getEmployees()
        // this.getNonMembers()
        console.log(val)
      },
      dialogMyProfileAdd(val){
        if(val){
          this.profile={
            salutation:'',
            middleInital:'',
            firstName:'',
            lastName:'',
            email:'',
            gender:'',
            dateOfBirth:'',
            nationalID:'',
            sub_amount:null,
            join_amount:null
          }
        }
      },
      addressForm(val){
        if(val == 'Add New Address'){
          this.address_data = {
            country:'',
            zipcode:'',
            provinceOrState:'',
            city:'',
            street:'',
            zimprovinceOrState:'',
            zimcity:'',
            zimstreet:'',
        }
        }
      }
    },
    methods: {
     async restPassword(data){
       this.dialogLoader = true
      let tableName = ''
      if(data.ruzhowaID.includes("AA")){
        tableName = 'Members'
      }
      else if(data.ruzhowaID.includes("NN")){
        tableName = 'NonMembers'
      }
      else if(data.ruzhowaID.includes("EP")){
        tableName = 'Employees'
      }

        let date = Date.now()
        await axios.post('data/api/restpassword2.php', {               
          ruzhowa_id:this.$session.get('user').ruzhowaID,
          member_email: data.email,
          new_password: date,
          member_id:data.ruzhowaID,
          tableName: tableName
          
        })
        .then(response => {
         
          this.dialogLoader = false
         // console.log(response)
          if(response.data.status == 'success'){
              this.dialogRestPassword = false
              Swal.fire(
                'Reset Successful',
                'Member password was reset successfully.',
                'success'
              )
             
          }else{
              Swal.fire(
                  'Reset Failed',
                  response.data.message,
                  'error'
                )
             
          }
          
        })
        .catch(error => {    
          this.loader = 'none'           
          console.log(error);
        });
      },
      exportExcel(){
      
        const worksheet = XLSX.utils.json_to_sheet(this.members)
        const workbook = {
          Sheets:{
            'data':worksheet
          },
          SheetNames:['data']
        };
        const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'});
        //console.log(excelBuffer)
        this.saveAsExcel(excelBuffer,'MembersList')
      },
      saveAsExcel(buffer,filename){
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer],{type:EXCEL_TYPE});
        saveAs(data,filename+EXCEL_EXTENSION)
      },
      exportExcel2(){
      
        const worksheet = XLSX.utils.json_to_sheet(this.nonmembers)
        const workbook = {
          Sheets:{
            'data':worksheet
          },
          SheetNames:['data']
        };
        const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'});
        //console.log(excelBuffer)
        this.saveAsExcel2(excelBuffer,'NonMembersList')
      },
      saveAsExcel2(buffer,filename){
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer],{type:EXCEL_TYPE});
        saveAs(data,filename+EXCEL_EXTENSION)
      },
      exportExcel3(){
      
        const worksheet = XLSX.utils.json_to_sheet(this.employees)
        const workbook = {
          Sheets:{
            'data':worksheet
          },
          SheetNames:['data']
        };
        const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'});
        //console.log(excelBuffer)
        this.saveAsExcel3(excelBuffer,'EmployeeList')
      },
      saveAsExcel3(buffer,filename){
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer],{type:EXCEL_TYPE});
        saveAs(data,filename+EXCEL_EXTENSION)
      },
    async save() {
        //ALTER TABLE Members AUTO_INCREMENT = 1
        //ALTER TABLE Address AUTO_INCREMENT = 1
        this.member_query = `INSERT INTO Members (ruzhowaID,firstName,lastName,middleInital,salutation,gender,email,nationalID,dateOfBirth,createdBy,idImage,photoImage,employer_school,occupation,education_level,country_code,primary_phone,secondary_phone,whatsapp_phone) VALUES `;
        this.address_query = `INSERT INTO Address (ruzhowaID, country, zipcode, provinceOrState,city,street,zimcity,zimprovinceOrState,zimstreet) VALUES `;
        this.member_type_query = `INSERT INTO MemberUserTypes (ruzhowaID,userType, createdBy) VALUES`
        
        let data_values = ''
        let address_values = ''
        let member_values = ''

        let data_values_length = this.csvDataMain.length - 1
        let address_values_length = this.csvDataAddress.length - 1

        this.csvDataMain.forEach((element,i) => {
          if(i < data_values_length){
            data_values += `("${element.ruzhowaID}","${element.firstName}","${element.lastName}","${element.middleInital}","${element.salutation}","${element.gender}","${element.email}","${element.nationalID}","${element.dateOfBirth}","${element.createdBy}","${element.idImage}","${element.photoImage}","${element.employer_school}","${element.occupation}","${element.education_level}","${element.country_code}","${element.primary_phone}","${element.secondary_phone}","${element.whatsapp_phone}"),`
            member_values += `("${element.ruzhowaID}",'1', "${element.createdBy}"),`
          }else{
            data_values += `("${element.ruzhowaID}","${element.firstName}","${element.lastName}","${element.middleInital}","${element.salutation}","${element.gender}","${element.email}","${element.nationalID}","${element.dateOfBirth}","${element.createdBy}","${element.idImage}","${element.photoImage}","${element.employer_school}","${element.occupation}","${element.education_level}","${element.country_code}","${element.primary_phone}","${element.secondary_phone}","${element.whatsapp_phone}")`
            member_values += `("${element.ruzhowaID}",'1', "${element.createdBy}")`
          }
          
        });
        this.csvDataAddress.forEach((element,i) => {
          if(i < address_values_length){
            address_values += `("${element.ruzhowaID}", "${element.country}", "${element.zipcode}", "${element.provinceOrState}","${element.city}","${element.street}","${element.zimcity}","${element.zimprovinceOrState}","${element.zimstreet}"),`
          }else{
            address_values += `("${element.ruzhowaID}", "${element.country}", "${element.zipcode}", "${element.provinceOrState}","${element.city}","${element.street}","${element.zimcity}","${element.zimprovinceOrState}","${element.zimstreet}")`
          }
         
        });

        this.member_query+=data_values
        this.address_query+=address_values
        this.member_type_query+=member_values

        // console.log(this.member_query)
        // console.log(this.address_query)
        await axios.post('data/api/myprofile.php',{                
          ruzhowa_id:this.selected_ruzhowa_id,
          function_type: 'upload',
          member_data:{
            member_query:this.member_query,
            address_query:this.address_query,
            member_type_query:this.member_type_query
          }
        })
        .then(response => {
          if(response.data.status == 'success'){
            this.dialogMyProfile = false
            
            Swal.fire(
              'Members Uploaded',
              'You have successfully uploaded bulk member profiles.',
              'success'
            )
            this.dialogUpload = false
        }else{
            Swal.fire(
                'Members Upload Failed',
                response.data.message,
                'error'
              )
            this.loader = 'none'
        }
        })
        .catch(error => {              
          console.log(error);
        });
      
      },
      csvReader(fileRaw) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            let csv = '';
            reader.onload = function (e) {
                csv = e.target.result;
                resolve(csv);
            }
            reader.onerror = function (err) {
                reject(err)
            }
            reader.readAsText(fileRaw)
        })
    },
    async uploader(e) {
        let file = null
        file = e.target.files[0]
        this.files = await this.csvReader(file)
        //console.log(file)
        //console.log(this.files)
        this.fileName = file.name

        if (this.files != '') {
          //  const csv = require('csvtojson')

            csv({
              output: "csv"
          })
                .fromString(this.files)
                .then(json => {
                    this.csvData = json
                    this.dialogUpload = true
                    let genderID = 0
                    let salutation = 0
                    
                    this.csvData.forEach(element => {
                       if(element[6] == 'Female'){
                          genderID = 2
                       }else{
                          genderID = 1
                       }
  

                       if(element[2] == 'Mr'){
                        salutation = 1
                       }else if(element[2] == 'Mrs'){
                        salutation = 2
                       }
                       else if(element[2] == 'Miss'){
                        salutation = 3
                      }
                      else if(element[2] == 'Ms'){
                        salutation = 4
                      }
                      else if(element[2] == 'Dr'){
                        salutation = 5
                      }
                      else if(element[2] == 'Sir'){
                        salutation = 6
                      }else{
                        salutation = 7
                      }

                      this.csvDataMain.push({
                        ruzhowaID:element[0],
                        email:element[1],
                        salutation:salutation,
                        firstName:element[3],
                        middleInital:element[4],
                        lastName:element[5],
                        gender:genderID,
                        dateOfBirth:element[7],
                        nationalID:element[8],
                        createdBy:this.$session.get('user').ruzhowaID,
                        idImage:element[9],
                        photoImage:element[10],
                        employer_school:element[11],
                        occupation:element[12],
                        education_level:element[13],
                        country_code:element[14],
                        primary_phone:element[15],
                        secondary_phone:element[16],
                        whatsapp_phone:element[17],
                        })
                    this.csvDataAddress.push({
                          ruzhowaID:element[0],
                          country:element[22],
                          zipcode:element[21],
                          provinceOrState:element[20],
                          city:element[19],
                          street:element[18],
                          zimcity:element[24],
                          zimprovinceOrState:element[25],
                          zimstreet:element[23],
                          
                          })
                    });
                    
                    // this.$swal.fire({
                    //     type: 'success',
                    //     title: 'Document Uploaded!!',
                    //     text: 'You document was uploaded successfully',
                    //     showConfirmButton: true
                    // })
                })
                .catch(err => {
                    this.$swal.fire({
                        type: 'error',
                        title: 'Can not convert csv!!',
                        text: err
                    })
                })
        }
    },
    statusCheck(data){
      if(data == 1){
       return 'Approved'
      }
      if(data == 2){
        return 'Suspended'
      }
      if(data == 3){
        return 'Expelled'
      }
      if(data == 4){
        return 'Resigned'
      }
      if(data == 5){
       return 'Active'
      }
    },
     async searchFunction(){
        var apiName = ''
        var tableType = ''

        if(this.tab == 0){
          apiName = 'myprofile'
          tableType = 'members'
        }if(this.tab == 1){
          apiName = 'myprofilenon'
          tableType = 'nonmembers'
        }if(this.tab == 2){
          apiName = 'myprofileemployee'
          tableType = 'employees'
        }

        if(this.selectedSearchMenu == 1){
          await axios.post('data/api/'+apiName+'.php',{               
            ruzhowa_id:this.searchText,
            function_type: 'read',
            member_data:{}
          })
          .then(response => {
           
            if(this.tab == 0){
              this.members = response.data.data
            }if(this.tab == 1){
              this.nonmembers = response.data.data
            }if(this.tab == 2){
              this.employees = response.data.data
            }
          })
          .catch(error => {              
            console.log(error);
          });
        }
        if(this.selectedSearchMenu == 2){
          await axios.post('data/api/'+apiName+'.php',{               
            ruzhowa_id:this.searchText,
            function_type: 'read_nid',
            member_data:{}
          })
          .then(response => {
           
            if(this.tab == 0){
              this.members = response.data.data
            }if(this.tab == 1){
              this.nonmembers = response.data.data
            }if(this.tab == 2){
              this.employees = response.data.data
            }
          })
          .catch(error => {              
            console.log(error);
          });
        }
        if(this.selectedSearchMenu == 3){
          await axios.post('data/api/'+apiName+'.php',{               
            ruzhowa_id:this.searchText,
            function_type: 'read_dob',
            member_data:{}
          })
          .then(response => {
           
            if(this.tab == 0){
              this.members = response.data.data
            }if(this.tab == 1){
              this.nonmembers = response.data.data
            }if(this.tab == 2){
              this.employees = response.data.data
            }
          })
          .catch(error => {              
            console.log(error);
          });
        }
        if(this.selectedSearchMenu == 4){
          await axios.post('data/api/'+apiName+'.php',{               
            ruzhowa_id:this.searchText,
            function_type: 'read_fname',
            member_data:{}
          })
          .then(response => {
           
            if(this.tab == 0){
              this.members = response.data.data
            }if(this.tab == 1){
              this.nonmembers = response.data.data
            }if(this.tab == 2){
              this.employees = response.data.data
            }
          })
          .catch(error => {              
            console.log(error);
          });
        }
        if(this.selectedSearchMenu == 5){
          await axios.post('data/api/'+apiName+'.php',{               
            ruzhowa_id:this.searchText,
            function_type: 'read_lname',
            member_data:{}
          })
          .then(response => {
           
            if(this.tab == 0){
              this.members = response.data.data
            }if(this.tab == 1){
              this.nonmembers = response.data.data
            }if(this.tab == 2){
              this.employees = response.data.data
            }
          })
          .catch(error => {              
            console.log(error);
          });
        }
         
      },
     async addAuthItem(data){
        console.log(data)
        await axios.post('data/api/authorizations.php',{               
          ruzhowa_id:this.selected_ruzhowa_id,
          auth_id: '0',
          function_type: 'create',
          auth_data:data
        })
        .then(response => {
          if(response.data.status == 'success'){
            this.dialogAddress = false
            this.getMyAuth()
            Swal.fire(
              'Authorization Added',
              'You have successfully added a new authorization.',
              'success'
            )
            this.loader = 'none'
          }else{
            Swal.fire(
                'Authorization Adding Failed',
                response.data.message,
                'error'
              )
            this.loader = 'none'
        }
        })
        .catch(error => {              
          console.log(error);
        });
      },
      menuClick(data){
        this.selectedSearchMenu = data.id
       // console.log(this.selectedSearchMenu)
        this.selectedSearchMenuText = `${data.title}`
        this.searchText = ''
        
      },
      editAuth(data){
        this.selected_ruzhowa_id = data.ruzhowaID
        this.getMyAuth()
        
      },
      editAddress(data){
        this.editaddress = 1

        this.addressForm = 'Edit Address'
        this.dialogAddress = true
        this.address_data = data
        this.selectedAddressID = data.addressID
      },
      deleteAddress(data){
      this.selectedAddressID = data.addressID
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
         
          this.finalDelete(this.selectedAddressID)
          
        }
      })
         
      },
      deleteAuth(data){
        this.selectedAddressID = data.memberUserTypesID
        Swal.fire({
          title: 'Are you sure?',
          text: "This will change user functionality!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Remove it!'
        }).then((result) => {
          if (result.value) {
           
            this.finalDeleteAuth(this.selectedAddressID)
            
          }
        })
           
        },
      async finalDeleteAuth(data){
          console.log(data)
          
            await axios.post('data/api/authorizations.php',{               
              ruzhowa_id:this.selected_ruzhowa_id,
              auth_id: data,
              function_type: 'delete',
              auth_data:{}
            })
            .then(response => {
              if(response.data.status == 'success'){
                this.dialogAddress = false
                this.getMyAuth()
                Swal.fire(
                  'Authorization Removed',
                  'You have successfully removed selected authorization.',
                  'success'
                )
                this.loader = 'none'
                this.editaddress = -1
            }else{
                Swal.fire(
                    'Authorization Removing Failed',
                    response.data.message,
                    'error'
                  )
                this.loader = 'none'
            }
            })
            .catch(error => {              
              console.log(error);
            });
        },
    async finalDelete(data){
      console.log(data)
      this.loader = 'flex'
        this.loadType = 'Deleting Member Address ...'
        await axios.post('data/api/addresses.php',{               
          ruzhowa_id:this.selected_ruzhowa_id,
          address_id: data,
          function_type: 'delete',
          address_data:{}
        })
        .then(response => {
          if(response.data.status == 'success'){
            this.dialogAddress = false
            this.getMyAddresses()
            Swal.fire(
              'Address Deleted',
              'You have successfully deleted your address.',
              'success'
            )
            this.loader = 'none'
            this.editaddress = -1
        }else{
            Swal.fire(
                'Address Deleting Failed',
                response.data.message,
                'error'
              )
            this.loader = 'none'
        }
        })
        .catch(error => {              
          console.log(error);
        });
    },
      selectedCountry(){
        //console.log(this.countries.indexOf(this.address_data.country))
        this.states = this.address_data.country.states
        this.address_data.country = this.address_data.country.name

      },
      selectedState(){
        //console.log(this.address_data.provinceOrState)
        this.cities = this.address_data.provinceOrState.cities
        this.address_data.provinceOrState = this.address_data.provinceOrState.name
      },
      selectedCity(){
       // console.log(this.address_data.city)
       
        this.address_data.city = this.address_data.city.name
      },
      selectedCityZim(){
        // console.log(this.address_data.city)
        
         this.address_data.zimcity = this.address_data.zimcity.name
       },
      selectedStateZim(){
        //console.log(this.address_data.provinceOrState)
        this.zim_cities = this.address_data.zimprovinceOrState.cities
        this.address_data.zimprovinceOrState = this.address_data.zimprovinceOrState.name
      },
      
     async countryData(){
        await axios.get('/countries.json').then((response)=>{
            this.countries = response.data
            this.zim_provs = this.countries[248].states
            //console.log(this.countries)
            }).catch(error =>{
              console.log(error)
            })
      },
      addNewAddress(){
        this.addressForm = 'Add New Address'
        this.dialogAddress = true
      },
      async getMyAddresses(){
        await axios.post('data/api/addresses.php',{               
          ruzhowa_id:this.selected_ruzhowa_id,
          address_id: '0',
          function_type: 'read',
          address_data:{}
        })
        .then(response => {
         // console.log(response.data);
        // this.addesses = []
          this.addesses = response.data.data
        })
        .catch(error => {              
          console.log(error);
        });
      },
      async getMyAuth(){
        await axios.post('data/api/authorizations.php',{               
          ruzhowa_id:this.selected_ruzhowa_id,
          auth_id: '0',
          function_type: 'read',
          auth_data:{}
        })
        .then(response => {
         // console.log(response.data);
        // this.addesses = []
          this.authorizations = response.data.data
          this.dialogAuth = true
        })
        .catch(error => {              
          console.log(error);
        });
      },
     async updateProfile(){
         if(this.profile.firstName.length < 1){
          Swal.fire(
              'Profile Error',
              'Please enter a valid first name',
              'warning'
            )
      }else if(this.profile.lastName.length < 1){
        Swal.fire(
            'Profile Error',
            'Please enter a valid last name',
            'warning'
              )
        }else if(this.profile.email.length < 1){
          Swal.fire(
              'Profile Error',
              'Please enter a valid email address',
              'warning'
            )
      }else if(this.profile.nationalID.length < 1){
            Swal.fire(
                'Password Error',
                'Please enter a valid national id.',
                'warning'
              )
        }else if(this.profile.dateOfBirth.length < 1){
        Swal.fire(
            'Password Error',
            'Please enter a valid date of birth.',
            'warning'
          )
    }else{
      this.loader = 'flex'
      this.loadType = 'Updating Member Profile ...'
      var apiName = ''

      if(this.tab == 0){
        apiName = 'myprofile'
      }if(this.tab == 1){
        apiName = 'myprofilenon'
      }if(this.tab == 2){
        apiName = 'myprofileemployee'
      }
        await axios.post('data/api/'+apiName+'.php',{                
          ruzhowa_id:this.selected_ruzhowa_id,
          function_type: 'update',
          member_data:this.profile
        })
        .then(response => {
          if(response.data.status == 'success'){
            this.dialogMyProfile = false
            
            Swal.fire(
              'Profile Updated',
              'You have successfully updated your profile.',
              'success'
            )
            this.loader = 'none'
            this.editaddress = -1
            // this.getMembers()
            // this.getEmployees()
            // this.getNonMembers()
            this.getGenders()
            this.getStatus()
            this.getSalutations()
            this.getUserTypes()
        }else{
            Swal.fire(
                'Profile Updating Failed',
                response.data.message,
                'error'
              )
            this.loader = 'none'
        }
        })
        .catch(error => {              
          console.log(error);
        });
      }

      },
      async updateAddress(){
        if(this.address_data.street.length < 1){
          Swal.fire(
              'Address Error',
              'Please enter a valid address',
              'warning'
            )
      }else if(this.address_data.city.length < 1){
          Swal.fire(
              'Password Error',
              'Please enter a valid city',
              'warning'
            )
      }else if(this.address_data.country.length < 1){
        Swal.fire(
            'Password Error',
            'Please enter a valid country.',
            'warning'
          )
    }else{
      this.loader = 'flex'
      this.loadType = 'Updating Member Address ...'
        await axios.post('data/api/addresses.php',{               
          ruzhowa_id:this.selected_ruzhowa_id,
          address_id: this.selectedAddressID,
          function_type: 'update',
          address_data:this.address_data
        })
        .then(response => {
          if(response.data.status == 'success'){
            this.dialogAddress = false
            this.getMyAddresses()
            Swal.fire(
              'Address Updated',
              'You have successfully updated your address.',
              'success'
            )
            this.loader = 'none'
            this.editaddress = -1
        }else{
            Swal.fire(
                'Address Updating Failed',
                response.data.message,
                'error'
              )
            this.loader = 'none'
        }
        })
        .catch(error => {              
          console.log(error);
        });
      }
      },
     async saveAddress(){
        if(this.address_data.street.length < 1){
          Swal.fire(
              'Address Error',
              'Please enter a valid address',
              'warning'
            )
      }else if(this.address_data.city.length < 1){
          Swal.fire(
              'Password Error',
              'Please enter a valid city',
              'warning'
            )
      }else if(this.address_data.country.length < 1){
        Swal.fire(
            'Password Error',
            'Please enter a valid country.',
            'warning'
          )
    }else{
      this.loader = 'flex'
      this.loadType = 'Saving Member Address ...'
        await axios.post('data/api/addresses.php',{               
          ruzhowa_id:this.selected_ruzhowa_id,
          address_id: '0',
          function_type: 'create',
          address_data:this.address_data
        })
        .then(response => {
          if(response.data.status == 'success'){
            this.dialogAddress = false
            this.getMyAddresses()
            Swal.fire(
              'Address Added',
              'You have successfully added an new address.',
              'success'
            )
            this.loader = 'none'
        }else{
            Swal.fire(
                'Address Adding Failed',
                response.data.message,
                'error'
              )
            this.loader = 'none'
        }
        })
        .catch(error => {              
          console.log(error);
        });
      }
      },
      
      async getGenders(){
        await axios.get('data/api/getgender.php')
        .then(response => {
         // console.log(response.data);
          this.gender = response.data.data
        })
        .catch(error => {              
          console.log(error);
        });
      },
      async getStatus(){
        await axios.get('data/api/getstatus.php')
        .then(response => {
         // console.log(response.data);
          this.statusData = response.data.data
        })
        .catch(error => {              
          console.log(error);
        });
      },
      async getUserTypes(){
        await axios.get('data/api/getusertypes.php')
        .then(response => {
         // console.log(response.data);
          this.items = response.data.data
        })
        .catch(error => {              
          console.log(error);
        });
      },
     async getSalutations(){
        await axios.post('data/api/getsalutations.php')
        .then(response => {
          
        //  console.log(response.data);
          this.salutations = response.data.data
          
        })
        .catch(error => {    
                 
          console.log(error);
        });
      },
     async getMembers(){
        await axios.get('data/api/getallmembers.php')
        .then(response => {
          this.members = response.data.data
        })
        .catch(error => {              
          console.log(error);
        });
      },
      async getNonMembers(){
        await axios.get('data/api/getallnonmembers.php')
        .then(response => {
          this.nonmembers = response.data.data
        })
        .catch(error => {              
          console.log(error);
        });
      },
      async getEmployees(){
        await axios.get('data/api/getallemployees.php')
        .then(response => {
          this.employees = response.data.data
        })
        .catch(error => {              
          console.log(error);
        });
      },
      createMember(){
        this.dialogMyProfileAdd = true
        
      },
      async saveUser(){
        
     
         if(this.profile.firstName.length < 1){
          Swal.fire(
              'Profile Error',
              'Please enter a valid first name',
              'warning'
            )
      }else if(this.profile.lastName.length < 1){
        Swal.fire(
            'Profile Error',
            'Please enter a valid last name',
            'warning'
              )
        }else if(this.profile.email.length < 1){
          Swal.fire(
              'Profile Error',
              'Please enter a valid email address',
              'warning'
            )
      }else if(this.profile.nationalID.length < 1){
            Swal.fire(
                'Profile Error',
                'Please enter a valid national id.',
                'warning'
              )
        }else if(this.profile.dateOfBirth.length < 1){
        Swal.fire(
            'Profile Error',
            'Please enter a valid date of birth.',
            'warning'
          )
        }else if(!this.profile.sub_amount){
            Swal.fire(
                'Profile Error',
                'Please enter a valid subscription amount.',
                'warning'
              )
        }else if(!this.profile.join_amount){
          Swal.fire(
              'Profile Error',
              'Please enter a valid joining fee amount.',
              'warning'
            )
      }else{
      this.loader = 'flex'
      this.loadType = 'Adding Member Profile ...'
      var apiName = ''

      if(this.tab == 0){
        apiName = 'myprofile'
      }if(this.tab == 1){
        apiName = 'myprofilenon'
      }if(this.tab == 2){
        apiName = 'myprofileemployee'
      }
        await axios.post('data/api/'+apiName+'.php',{               
          ruzhowa_id:this.$session.get('user').ruzhowaID,
          function_type: 'create',
          member_data:this.profile
        })
        .then(response => {
          if(response.data.status == 'success'){
            this.dialogMyProfileAdd = false
            
            Swal.fire(
              'Profile Added',
              'You have successfully added a new profile.',
              'success'
            )
            this.loader = 'none'
            this.getMembers()
            this.getNonMembers()
            this.getEmployees()
            
        }else{
            Swal.fire(
                'Profile adding Failed',
                response.data.message,
                'error'
              )
            this.loader = 'none'
        }
        })
        .catch(error => {              
          console.log(error);
        });
      }
      },
     async editDetails(data){
        
        this.selected_ruzhowa_id = data.ruzhowaID
        var apiName = ''
        if(this.tab == 0){
          apiName = 'myprofile'
        }if(this.tab == 1){
          apiName = 'myprofilenon'
        }if(this.tab == 2){
          apiName = 'myprofileemployee'
        }
        await axios.post('data/api/'+apiName+'.php',{               
          ruzhowa_id:this.selected_ruzhowa_id,
          function_type: 'read',
          member_data:{}
        })
        .then(response => {
         // console.log(response.data);
          this.profile = response.data.data[0]
        })
        .catch(error => {              
          console.log(error);
        });

        await axios.post('data/api/addresses.php',{               
          ruzhowa_id:this.selected_ruzhowa_id,
          address_id: '0',
          function_type: 'read',
          address_data:{}
        })
        .then(response => {
         // console.log(response.data);
          this.addesses = response.data.data
          console.log(this.addesses);
          this.dialogMyProfile = true
        })
        .catch(error => {              
          console.log(error);
        });
      },
      
      
    },
    
    
  };
