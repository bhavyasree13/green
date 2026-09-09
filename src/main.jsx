import React,{useMemo,useState,useEffect} from "react";
import {createRoot} from "react-dom/client";
import {Leaf,LayoutDashboard,Database,Plus,Cloud,Activity,Sparkles,Play,ShieldCheck,Bell,Settings,LogOut,Search,Clock3,Check,Wallet,Target,Eye,ArrowRight,RefreshCw,AlertTriangle,X,CircleCheck,Building2,Users,Server,BarChart3,FileText,SlidersHorizontal,Globe2,Cpu,Pause,Square,RotateCcw,ChevronDown,User} from "lucide-react";
import {ResponsiveContainer,AreaChart,Area,XAxis,YAxis,Tooltip,CartesianGrid,PieChart,Pie,Cell} from "recharts";
import "./index.css";

const T={brand:"#0c7c06",brandText:"#34AC2D",grid:"#26352b",axis:"#718078",surface:"#0d1712",line:"#304236",text:"#EDF3F7"};
const R=[["Telangana","India","Southern India (IN-SO)","INR","356"],["Gujarat","India","Western India (IN-WE)","INR","332"],["Himachal Pradesh","India","Northern India (IN-NO)","INR","218"],["West Bengal","India","Eastern India (IN-EA)","INR","438"],["California","United States","California","USD","205"],["South Australia","Australia","South Australia","AUD","290"]];
const C=[{h:"00",v:420},{h:"02",v:395},{h:"04",v:410},{h:"06",v:470},{h:"08",v:520},{h:"10",v:390},{h:"12",v:310},{h:"14",v:285},{h:"16",v:330},{h:"18",v:500},{h:"20",v:555},{h:"22",v:450}];
const seed=[
 {id:"J1001",name:"Fraud Detection Model Training",type:"ML Training",user:"Aarav Mehta",team:"ML Research",priority:"High",status:"Scheduled",submit:"Sep 04, 11:03",earliest:"Sep 04, 12:00",deadline:"Sep 05, 18:00",region:"Telangana",runtime:"4h",power:"8 kW",deferrable:"Yes",image:"registry/greenshift/fraud:v2",cpu:"4",memory:"16 GB",carbonBudget:"2.5 kg",org:"Acme Analytics"},
 {id:"J1002",name:"Customer Data ETL",type:"ETL / Data Processing",user:"Priya N.",team:"Data Engineering",priority:"Medium",status:"Running",submit:"Sep 04, 12:10",earliest:"Sep 04, 14:00",deadline:"Sep 05, 20:00",region:"Telangana",runtime:"2h",power:"5 kW",deferrable:"Yes",image:"registry/greenshift/etl:v5",cpu:"3",memory:"12 GB",carbonBudget:"1.8 kg",org:"Acme Analytics"},
 {id:"J1003",name:"Marketing Analytics Job",type:"Data Analytics",user:"Neha Rao",team:"Analytics",priority:"Low",status:"Pending",submit:"Sep 05, 08:42",earliest:"Sep 05, 12:00",deadline:"Sep 05, 22:00",region:"Gujarat",runtime:"3h",power:"4 kW",deferrable:"Yes",image:"registry/greenshift/analytics:v3",cpu:"2",memory:"8 GB",carbonBudget:"2.0 kg",org:"Acme Analytics"},
 {id:"J1004",name:"Nightly Database Backup",type:"Backup",user:"Rohan Shah",team:"Platform Ops",priority:"Low",status:"Scheduled",submit:"Sep 05, 09:10",earliest:"Sep 05, 22:00",deadline:"Sep 06, 06:00",region:"Telangana",runtime:"2h",power:"6 kW",deferrable:"Yes",image:"registry/greenshift/backup:v4",cpu:"2",memory:"8 GB",carbonBudget:"1.5 kg",org:"Acme Analytics"},
 {id:"J1005",name:"Weekly Business Report",type:"Report Generation",user:"Priya N.",team:"Finance",priority:"Medium",status:"Completed",submit:"Sep 04, 10:15",earliest:"Sep 04, 12:00",deadline:"Sep 04, 16:00",region:"Telangana",runtime:"1h",power:"2 kW",deferrable:"Yes",image:"registry/greenshift/report:v8",cpu:"1",memory:"4 GB",carbonBudget:"0.8 kg",org:"Acme Analytics"},
 {id:"J1006",name:"Release Build & Test",type:"CI/CD",user:"Kiran Dev",team:"Application Dev",priority:"High",status:"Scheduled",submit:"Sep 05, 10:05",earliest:"Sep 05, 16:00",deadline:"Sep 05, 21:00",region:"Telangana",runtime:"1.5h",power:"7 kW",deferrable:"Yes",image:"registry/greenshift/build:v9",cpu:"4",memory:"16 GB",carbonBudget:"1.2 kg",org:"Beta Systems"},
 {id:"J1007",name:"Forecast Pipeline",type:"ML Training",user:"Sara Khan",team:"Data Science",priority:"Critical",status:"Failed",submit:"Sep 05, 09:50",earliest:"Sep 05, 11:00",deadline:"Sep 05, 19:00",region:"California",runtime:"5h",power:"10 kW",deferrable:"No",image:"registry/greenshift/forecast:v6",cpu:"8",memory:"32 GB",carbonBudget:"5.0 kg",org:"Beta Systems"}
];
const IDENTITY={
 "Normal User":{name:"Priya N.",email:"priya@company.com",initials:"PN",team:"Data Engineering",org:"Acme Analytics",status:"Active",joined:"Aug 12, 2026",lastActive:"Today, 11:42",workloads:12,scope:"Workloads you submitted"},
 "Company Admin":{name:"Acme Admin",email:"admin@company.com",initials:"AA",team:"Platform Ops",org:"Acme Analytics",status:"Active",joined:"Jun 10, 2026",lastActive:"Today, 09:55",workloads:24,scope:"Acme Analytics workspace"},
 "Platform Admin":{name:"Platform Admin",email:"admin@company.com",initials:"PA",team:"Platform Engineering",org:"GreenShift Platform",status:"Active",joined:"Mar 02, 2026",lastActive:"Today, 08:20",workloads:37,scope:"All organizations"}
};
const roles={
 "Normal User":{caption:"WORKLOAD USER",items:[["Dashboard","Dashboard",LayoutDashboard],["Carbon & Cost Data","Carbon & Cost Data",Leaf],["Regions & Resources","Regions & Resources",Server],["My Workloads","My Workloads",Database],["Submit Workload","Submit Workload",Plus],["Scheduling Decisions","Scheduling Decisions",Sparkles],["Job Monitoring","Job Monitoring",Play],["Audit & Trust","Audit & Trust",ShieldCheck],["Alerts","Alerts",Bell],["Profile & Settings","Profile & Settings",Settings]]},
 "Company Admin":{caption:"COMPANY OPERATIONS",items:[["Dashboard","Dashboard",LayoutDashboard],["Users & Teams","Users & Teams",Users],["Carbon & Cost Data","Carbon & Cost Data",Leaf],["Regions & Resources","Regions & Resources",Server],["Workloads","Workloads",Database],["Submit Workload","Submit Workload",Plus],["Scheduling Engine","Scheduling Engine",Sparkles],["Job Monitoring","Job Monitoring",Play],["Analytics","Analytics",BarChart3],["Audit & Trust","Audit & Trust",ShieldCheck],["Alerts","Alerts",Bell],["Profile","Profile",User],["Settings","Settings",Settings]]},
 "Platform Admin":{caption:"PLATFORM OPERATIONS",items:[["Dashboard","Dashboard",LayoutDashboard],["Organizations","Organizations",Building2],["Users & Access","Users & Access",Users],["Carbon & Cost Data","Carbon & Cost Data",Leaf],["Regions & Resources","Regions & Resources",Server],["Workloads","Workloads",Database],["Submit Workload","Submit Workload",Plus],["Scheduling Engine","Scheduling Engine",Sparkles],["Job Monitoring","Job Monitoring",Play],["Audit & Trust","Audit & Trust",ShieldCheck],["Alerts","Alerts",Bell],["Profile","Profile",User],["Settings","Settings",Settings]]}
};
function App(){const [login,setLogin]=useState(false),[role,setRole]=useState("Platform Admin"),[page,setPage]=useState("Dashboard"),[reg,setReg]=useState(R[0]),[jobs,setJobs]=useState(seed),[selected,setSelected]=useState(seed[0]),[toast,setToast]=useState("");
 const go=x=>setPage(x); const msg=x=>{setToast(x);setTimeout(()=>setToast(""),2200)};
 const scoped=useMemo(()=>role==="Normal User"?jobs.filter(j=>j.user==="Priya N."):role==="Company Admin"?jobs.filter(j=>j.org==="Acme Analytics"):jobs,[jobs,role]);
 if(!login)return <Login role={role} setRole={setRole} onLogin={()=>{setPage("Dashboard");setLogin(true)}}/>;
 return <div className="app"><Side role={role} p={page} go={go} logout={()=>setLogin(false)}/><main><header><div><small>GreenShift / {page}</small><h1>{page}</h1></div><div className="headRight"><span className="roleBadge"><ShieldCheck size={14}/>{role}</span><select value={reg[0]} onChange={e=>setReg(R.find(x=>x[0]==e.target.value))}>{R.map(x=><option key={x[0]}>{x[0]}</option>)}</select><button className="icon" onClick={()=>msg("No new critical notifications")}><Bell size={17}/><i/></button></div></header><section className="content"><PageRouter role={role} page={page} jobs={scoped} allJobs={jobs} reg={reg} setReg={setReg} selected={selected} setSelected={setSelected} go={go} msg={msg} setJobs={setJobs} addJob={j=>{setJobs([j,...jobs]);setSelected(j);go(role==="Platform Admin"?"Scheduling Engine":"Scheduling Decisions");msg("Workload submitted")}}/></section></main>{toast&&<div className="toast"><CircleCheck size={17}/>{toast}</div>}</div>}

function Side({role,p,go,logout}){
  const cfg=roles[role];
  const who=IDENTITY[role];
  return <aside>
    <div className="brand"><b>⑁</b> GreenShift</div>
    <div className="caption">{cfg.caption}</div>
    {cfg.items.map(([label,target,Icon])=>
      <button key={label} className={"nav"+(p===target?" on":"")} onClick={()=>go(target)}>
        <Icon size={16}/>{label}
      </button>
    )}
    <div className="bottom">
      <div className="user">
        <span>{who.initials}</span>
        <div><b>{who.name}</b><small>{who.email}</small></div>
        <button onClick={logout} title="Sign out"><LogOut size={16}/></button>
      </div>
    </div>
  </aside>;
}

function PageRouter({role,page,jobs,allJobs,reg,setReg,selected,setSelected,go,msg,setJobs,addJob}){
  const decisionsPage=role==="Normal User"?"Scheduling Decisions":"Scheduling Engine";
  const open=j=>{setSelected(j);go(decisionsPage)};
  switch(page){
    case "Dashboard":            return <Dashboard role={role} jobs={jobs} allJobs={allJobs} go={go}/>;
    case "My Workloads":
    case "Workloads":            return <Jobs role={role} jobs={jobs} open={open}/>;
    case "Submit Workload":      return <Submit role={role} reg={reg} setReg={setReg} addJob={addJob}/>;
    case "Scheduling Decisions":
    case "Scheduling":
    case "Scheduling Engine":    return <Scheduling role={role} jobs={jobs} selected={selected} setSelected={setSelected} go={go} msg={msg}/>;
    case "Job Monitoring":       return <Monitor role={role} jobs={jobs} msg={msg} setJobs={setJobs}/>;
    case "Carbon & Cost":
    case "Carbon & Cost Data":   return <Carbon role={role} reg={reg}/>;
    case "Audit & Trust":        return <Audit role={role} jobs={jobs}/>;
    case "Alerts":
    case "Alerts & Incidents":   return <Alerts role={role} msg={msg}/>;
    case "Users & Teams":
    case "Users & Access":       return <UsersPage role={role}/>;
    case "Analytics":            return <Analytics jobs={jobs}/>;
    case "Regions & Resources":  return <Regions role={role} reg={reg} setReg={setReg}/>;
    case "Organizations":        return <Organizations jobs={allJobs} msg={msg}/>;
    case "Reports":              return <Reports role={role}/>;
    case "Profile & Settings":
    case "Profile":              return <Profile role={role} msg={msg}/>;
    case "Settings":             return <SettingsPage role={role}/>;
    default:                     return <Dashboard role={role} jobs={jobs} allJobs={allJobs} go={go}/>;
  }
}

function Login({role,setRole,onLogin}){
  const [register,setRegister]=useState(false);
  const [email,setEmail]=useState(role==="Normal User"?"priya@company.com":"admin@company.com");
  const [form,setForm]=useState({name:"",email:"",organization:"Acme Analytics",team:"",password:"",confirm:""});
  const [error,setError]=useState("");
  const update=(k,v)=>setForm(f=>({...f,[k]:v}));
  const submitRegistration=()=>{
    if(!form.name.trim()||!form.email.trim()||!form.team.trim()||!form.password){
      setError("Please complete all required fields.");
      return;
    }
    if(form.password!==form.confirm){
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setEmail(form.email);
    setRole("Normal User");
    setRegister(false);
  };
  if(register)return <div className="login"><div className="hero"><img className="landingHeroImage" src="/greenshift-landing.png" alt="GreenShift sustainable compute"/></div><div className="signin"><div className="box"><div className="brand"><b>⌁</b> GreenShift</div><h2>Create account</h2><p>Register for your GreenShift enterprise workspace.</p><div className="registerGrid"><label>Full name<input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="e.g. Ananya Rao"/></label><label>Work email<input type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="name@company.com"/></label><label>Organization<select value={form.organization} onChange={e=>update("organization",e.target.value)}><option>Acme Analytics</option><option>Beta Systems</option><option>Northstar Finance</option><option>Vertex Labs</option></select></label><label>Team<input value={form.team} onChange={e=>update("team",e.target.value)} placeholder="e.g. Data Engineering"/></label><label>Password<input type="password" value={form.password} onChange={e=>update("password",e.target.value)} placeholder="Create a password"/></label><label>Confirm password<input type="password" value={form.confirm} onChange={e=>update("confirm",e.target.value)} placeholder="Re-enter password"/></label></div>{error&&<div className="formError">{error}</div>}<button className="primary full" onClick={submitRegistration}>Create account <ArrowRight size={16}/></button><div className="authSwitch">Already have an account? <button onClick={()=>{setRegister(false);setError("")}}>Sign in</button></div></div></div></div>;
  return <div className="login"><div className="hero"><img className="landingHeroImage" src="/greenshift-landing.png" alt="GreenShift sustainable compute"/></div><div className="signin"><div className="box"><div className="brand"><b>⌁</b> GreenShift</div><h2>Welcome back</h2><p></p><label>Role</label><select value={role} onChange={e=>{setRole(e.target.value);setEmail(e.target.value==="Normal User"?"priya@company.com":"admin@company.com")}}>{Object.keys(roles).map(r=><option key={r}>{r}</option>)}</select><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)}/><label>Password</label><input type="password" defaultValue="greenshift"/><button className="primary full" onClick={onLogin}>Sign in <ArrowRight size={16}/></button><div className="authSwitch">Don't have an account? <button onClick={()=>{setRegister(true);setError("")}}>Register</button></div></div></div></div>
}
function Top({title,sub,action}){return <div className="top"><div><h2>{title}</h2><p>{sub}</p></div>{action}</div>}
function K({icon:I,t,v,s}){return <div className="k"><span>{t}<I size={15}/></span><b>{v}</b><small>{s}</small></div>}
function Panel({t,children}){return <div className="panel"><h3>{t}</h3>{children}</div>}
function Chart(){return <ResponsiveContainer width="100%" height={250}><AreaChart data={C}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={T.brandText} stopOpacity=".38"/><stop offset="1" stopColor={T.brandText} stopOpacity="0"/></linearGradient></defs><CartesianGrid stroke={T.grid} strokeDasharray="3 3"/><XAxis dataKey="h" stroke={T.axis} tick={{fontSize:13,fill:T.axis}}/><YAxis stroke={T.axis} tick={{fontSize:13,fill:T.axis}}/><Tooltip contentStyle={{background:T.surface,border:"1px solid "+T.line,borderRadius:8,color:T.text,fontSize:13}}/><Area dataKey="v" stroke={T.brandText} fill="url(#g)" strokeWidth="2.5"/></AreaChart></ResponsiveContainer>}
function StatusPie({jobs}){const statuses=["Scheduled","Running","Pending","Completed","Failed","Cancelled","Terminated"];const data=statuses.map(status=>({status,count:jobs.filter(j=>j.status===status).length})).filter(x=>x.count>0);return <div className="statusChart"><div className="statusDonut"><ResponsiveContainer width="100%" height={210}><PieChart><Pie data={data} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={58} outerRadius={82} paddingAngle={2} stroke="none">{data.map((entry,i)=><Cell key={entry.status} fill={STATUS_COLORS[i%STATUS_COLORS.length]}/>)}</Pie><Tooltip contentStyle={{background:T.surface,border:"1px solid "+T.line,borderRadius:8,color:T.text,fontSize:12}}/></PieChart></ResponsiveContainer><div className="statusCenter"><b>{jobs.length}</b><small>Total</small></div></div><div className="statusLegend">{data.map((x,i)=><div className="statusLegendRow" key={x.status}><span><i style={{background:STATUS_COLORS[i%STATUS_COLORS.length]}}/>{x.status}</span><b>{x.count}</b></div>)}</div></div>}
const STATUS_COLORS=["#34AC2D","#4A9DD5","#D9A23C","#566674","#E07B6D","#9B7EDB","#A98F64"];

function Dashboard({role,jobs,allJobs,go}){let data=role==="Platform Admin"?allJobs:jobs;return <><Top title="Dashboard" sub={role==="Normal User"?"Everything here is limited to workloads you personally submitted.":role==="Company Admin"?"Complete overview of your company workloads and impact.":"Platform-wide operational, scheduling and sustainability overview."} action={role!=="Company Admin"?<button className="primary" onClick={()=>go("Submit Workload")}><Plus size={16}/> Submit Workload</button>:null}/><div className="cards">{role==="Platform Admin"&&<K icon={Building2} t="Organizations" v="8" s="Active organizations"/>}<K icon={Database} t="Total Jobs" v={data.length} s="Current scope"/><K icon={Clock3} t="Scheduled" v={data.filter(x=>x.status==="Scheduled").length} s="Within SLA"/><K icon={Play} t="Running" v={data.filter(x=>x.status==="Running").length} s="Active now"/><K icon={Check} t="Completed" v={data.filter(x=>x.status==="Completed").length} s="Successful"/><K icon={Leaf} t="Carbon Avoided" v="48.6 kg" s="CO₂e"/><K icon={Wallet} t="Cost Saved" v="₹3,250" s="vs immediate execution"/><K icon={Target} t="Carbon Reduction" v="18.4%" s="Average"/><K icon={ShieldCheck} t="SLA Compliance" v="98%" s="On time"/></div><div className="grid"><Panel t="Carbon Intensity Trend"><Chart/></Panel><Panel t="Jobs by Status"><StatusPie jobs={data}/></Panel></div><div className="grid"><Panel t="Upcoming Deadlines">{data.filter(x=>x.status!=="Completed").slice(0,5).map(j=><div className="deadline" key={j.id}><Clock3 size={16}/><div><b>{j.name}</b><small>{j.id} • {j.org}</small></div><span>{j.deadline}</span></div>)}</Panel><Panel t="Carbon vs Cost Impact"><div className="impact"><b>Carbon avoided</b><strong>48.6 kg CO₂e</strong><b>Cost saved</b><strong>₹3,250</strong><div className="bar"><i/></div><small>GreenShift selects feasible windows while respecting deadlines, resources and carbon budgets.</small></div></Panel></div></>}
function Jobs({role,jobs,open}){const [q,setQ]=useState(""),[status,setStatus]=useState("All Status"),[priority,setPriority]=useState("All Priorities"),[region,setRegion]=useState("All Regions");let list=jobs.filter(j=>(j.id+" "+j.name+" "+j.type+" "+j.user+" "+j.team+" "+j.region+" "+j.image).toLowerCase().includes(q.toLowerCase())&&(status==="All Status"||j.status===status)&&(priority==="All Priorities"||j.priority===priority)&&(region==="All Regions"||j.region===region));return <><Top title={role==="Normal User"?"My Workloads":"Workloads"} sub={role==="Normal User"?"Past, active and future jobs submitted by you.":role==="Company Admin"?"Complete company job registry, newest to oldest.":"All workloads across every organization."}/><div className="toolbar"><div className="search"><Search size={16}/><input placeholder="Search Job ID, type, team, region, container image..." value={q} onChange={e=>setQ(e.target.value)}/></div><select value={status} onChange={e=>setStatus(e.target.value)}><option>All Status</option>{["Queued","Scheduled","Running","Paused","At Risk","Pending","Completed","Failed","Cancelled","Terminated"].map(x=><option key={x}>{x}</option>)}</select><select value={priority} onChange={e=>setPriority(e.target.value)}><option>All Priorities</option>{["Critical","High","Medium","Low"].map(x=><option key={x}>{x}</option>)}</select><select value={region} onChange={e=>setRegion(e.target.value)}><option>All Regions</option>{R.map(x=><option key={x[0]}>{x[0]}</option>)}</select></div><div className="table"><table><thead><tr><th>#</th><th>Job ID</th><th>Job / Type</th>{role!=="Normal User"&&<th>Organization</th>}<th>User / Team</th><th>Priority</th><th>Status</th><th>Region</th><th>Deadline</th><th/></tr></thead><tbody>{list.map((j,i)=><tr key={j.id}><td>{i+1}</td><td className="mono">{j.id}</td><td><b>{j.name}</b><small>{j.type} • {j.runtime} • {j.power}</small></td>{role!=="Normal User"&&<td>{j.org}</td>}<td>{j.user}<small>{j.team}</small></td><td><em className={"pill "+j.priority.toLowerCase()}>{j.priority}</em></td><td><span className="status">● {j.status}</span></td><td>{j.region}</td><td>{j.deadline}</td><td><button className="link" onClick={()=>open(j)}><Eye size={14}/> View</button></td></tr>)}</tbody></table></div></>}
function Submit({role,reg,setReg,addJob}){
  const [f,setF]=useState({id:"",type:"ML Training",team:"",priority:"Medium",region:reg[0],earliest:"",deadline:"",runtime:2,power:4,deferrable:true,image:"",cpu:4,memory:16,carbon:2.5,org:"Acme Analytics"});
  const s=(k,v)=>setF({...f,[k]:v});
  return <>
    <Top title="Submit Workload" sub="Select the execution region explicitly. GreenShift will evaluate carbon, cost, resources and feasible windows for that region."/>

    <div className="formgrid">
      <Panel t="Workload Details">
        <div className="fields">
          {role==="Platform Admin"&&<Field t="Target organization" wide>
            <select value={f.org} onChange={e=>s("org",e.target.value)}>
              <option>Acme Analytics</option><option>Beta Systems</option><option>Northstar Finance</option><option>Vertex Labs</option>
            </select>
          </Field>}
          <Field t="Job ID"><input value={f.id} onChange={e=>s("id",e.target.value)} placeholder="e.g. J1008"/></Field>
          <Field t="Job Type"><select value={f.type} onChange={e=>s("type",e.target.value)}>{["ML Training","ETL / Data Processing","Data Analytics","Backup","Report Generation","CI/CD"].map(x=><option key={x}>{x}</option>)}</select></Field>
          <Field t="Team"><input value={f.team} onChange={e=>s("team",e.target.value)} placeholder="Team name"/></Field>
          <Field t="Priority"><select value={f.priority} onChange={e=>s("priority",e.target.value)}>{["Critical","High","Medium","Low"].map(x=><option key={x}>{x}</option>)}</select></Field>
        </div>
      </Panel>

      <Panel t="Scheduling Window">
        <div className="fields">
          <Field t="Execution Region"><select value={f.region} onChange={e=>{s("region",e.target.value);setReg(R.find(x=>x[0]===e.target.value))}}>{R.map(x=><option key={x[0]}>{x[0]}</option>)}</select></Field>
          <Field t="Runtime (hours)"><input type="number" value={f.runtime} onChange={e=>s("runtime",e.target.value)}/></Field>
          <Field t="Earliest Start Time"><input type="datetime-local" value={f.earliest} onChange={e=>s("earliest",e.target.value)}/></Field>
          <Field t="Deadline"><input type="datetime-local" value={f.deadline} onChange={e=>s("deadline",e.target.value)}/></Field>
        </div>
      </Panel>

      <Panel t="Execution Requirements">
        <div className="fields three">
          <Field t="Power (kW)"><input type="number" value={f.power} onChange={e=>s("power",e.target.value)}/></Field>
          <Field t="CPU Request"><input value={f.cpu} onChange={e=>s("cpu",e.target.value)}/></Field>
          <Field t="Memory Request"><input value={f.memory} onChange={e=>s("memory",e.target.value)}/></Field>
          <Field t="Carbon Budget (kg CO₂e)"><input value={f.carbon} onChange={e=>s("carbon",e.target.value)}/></Field>
          <Field t="Container Image"><input value={f.image} onChange={e=>s("image",e.target.value)} placeholder="registry/image:tag"/></Field>
          <Field t="Deferrable"><label className="inlineCheck"><input type="checkbox" checked={f.deferrable} onChange={e=>s("deferrable",e.target.checked)}/> Yes, workload can shift within constraints</label></Field>
        </div>
      </Panel>
    </div>

    <div className="submitbar">
      <span>Selected execution region: <b>{f.region}</b></span>
      <button className="primary" onClick={()=>addJob({id:f.id||"J"+(1008+Math.floor(Math.random()*90)),name:f.type+" Workload",type:f.type,user:role==="Normal User"?"Priya N.":role==="Company Admin"?"Company Admin":"Platform Admin",team:f.team||"Unassigned",priority:f.priority,status:"Pending",submit:"System generated",earliest:f.earliest||"Next feasible",deadline:f.deadline||"Not set",region:f.region,runtime:f.runtime+"h",power:f.power+" kW",deferrable:f.deferrable?"Yes":"No",image:f.image||"Not specified",cpu:f.cpu,memory:f.memory+" GB",carbonBudget:f.carbon+" kg",org:role==="Platform Admin"?f.org:"Acme Analytics"})}>Submit & Find Feasible Slot <ArrowRight size={16}/></button>
    </div>
  </>;
}
function Field({t,children,wide}){return <label className={wide?"wide":undefined}><span>{t}</span>{children}</label>}
function Scheduling({role,jobs,selected,setSelected,go,msg}){
  const [mode,setMode]=useState("GreenShift Optimized");
  const [window,setWindow]=useState("12:00–16:00");

  const activeJob = selected && jobs.some(j=>j.id===selected.id)
    ? selected
    : jobs[0];

  const [region,setRegion]=useState(activeJob?.region || R[0][0]);

  React.useEffect(()=>{
    if(activeJob){
      setRegion(activeJob.region);
      if(!selected || selected.id!==activeJob.id) setSelected(activeJob);
    }
  },[activeJob?.id]);

  const choose=(j)=>{
    setSelected(j);
    setRegion(j.region);
  };

  if(!activeJob){
    return <Panel t="Scheduling">No workloads are currently available for scheduling.</Panel>;
  }

  return <><Top title={role==="Normal User"?"Scheduling Decision":"Scheduling Engine"} sub={role==="Platform Admin"?"Platform-wide scheduling control with override and execution controls.":"Inspect recommended windows, feasibility and decision factors."} action={<label className="jobPicker"><span>Workload</span><select value={activeJob.id} onChange={e=>choose(jobs.find(j=>j.id===e.target.value))}>{jobs.map(j=><option key={j.id} value={j.id}>{j.id} — {j.name} ({j.status})</option>)}</select></label>}/><div className="decision"><Sparkles/><div><small>RECOMMENDED EXECUTION WINDOW</small><h2>{window}</h2><p>Best feasible balance of carbon intensity, electricity cost and workload constraints.</p></div><div className="decisionStats"><b>310 g/kWh<small>Carbon</small></b><b>₹498<small>Estimated cost</small></b><b>1.24 kg<small>CO₂e</small></b></div></div><div className="grid"><Panel t="Why this slot?"><Reason t="Meets carbon budget"/><Reason t="Completes before deadline"/><Reason t="CPU / RAM / GPU resources available"/><Reason t="Avoids evening peak tariff"/><Reason t="Lower carbon intensity than immediate execution"/></Panel><Panel t="Decision Factors"><div className="factor">Carbon impact <i style={{width:"86%"}}/></div><div className="factor">Cost impact <i style={{width:"72%"}}/></div><div className="factor">Deadline feasibility <i style={{width:"100%"}}/></div></Panel></div><Panel t="Candidate Slot Comparison"><table><thead><tr><th>Window</th><th>Carbon</th><th>Cost</th><th>Deadline</th><th>Resources</th><th>Decision</th></tr></thead><tbody>{[["10:00–14:00",520,612,"Yes","Yes","Candidate"],["11:00–15:00",402,544,"Yes","Yes","Feasible"],["12:00–16:00",310,498,"Yes","Yes","Recommended"],["14:00–18:00",335,526,"Yes","Yes","Feasible"],["16:00–20:00",462,588,"Yes","Yes","Higher carbon"]].map(x=><tr key={x[0]}><td>{x[0]}</td><td>{x[1]} g/kWh</td><td>₹{x[2]}</td><td>{x[3]}</td><td>{x[4]}</td><td className={x[5]==="Recommended"?"greenText":""}>{x[5]}</td></tr>)}</tbody></table></Panel><ImmediateExecutionComparison job={activeJob}/>{role!=="Normal User"&&<Panel t="Admin Schedule Controls"><div className="adminControls"><Field t="Schedule Type"><select value={mode} onChange={e=>setMode(e.target.value)}><option>GreenShift Optimized</option><option>Carbon Priority</option><option>Cost Priority</option><option>Manual Override</option></select></Field><Field t="Execution Region"><select value={region} onChange={e=>setRegion(e.target.value)}>{R.map(x=><option key={x[0]}>{x[0]}</option>)}</select></Field><Field t="Execution Window"><select value={window} onChange={e=>setWindow(e.target.value)}>{["10:00–14:00","11:00–15:00","12:00–16:00","14:00–18:00","16:00–20:00"].map(x=><option key={x}>{x}</option>)}</select></Field></div><div className="actions"><button className="secondary" onClick={()=>msg("Scheduling engine re-run requested")}><RefreshCw size={15}/> Re-run Scheduling</button><button className="primary" onClick={()=>msg("Schedule updated and audit record created")}><Check size={15}/> Apply Schedule</button></div></Panel>}<div className="actions"><button className="secondary" onClick={()=>go(role==="Normal User"?"My Workloads":"Workloads")}>Back</button>{role==="Normal User"?<button className="primary" onClick={()=>{msg("Schedule confirmed");go("Job Monitoring")}}>Confirm Schedule <Check size={16}/></button>:null}</div></>}
function ImmediateExecutionComparison({job}){if(!job)return null;return <Panel t="Immediate Execution vs GreenShift"><div className="comparison"><div><small> Immediate</small><h2>Original execution</h2><p>Window: 08:00–12:00</p><p>Carbon: 462 g/kWh</p><p>Cost: ₹588</p><p>Emissions: 1.85 kg CO₂e</p><p>SLA: Maintained</p></div><ArrowRight/><div className="highlight"><small>GREENSHIFT • OPTIMIZED</small><h2>{windowLabel(job)}</h2><p>Region: {job.region}</p><p>Carbon: 310 g/kWh</p><p>Cost: ₹498</p><p>Emissions: 1.24 kg CO₂e</p><p>SLA: Maintained</p></div></div><div className="cards three"><K icon={Leaf} t="Carbon avoided" v="0.61 kg" s="33% reduction"/><K icon={Wallet} t="Cost saved" v="₹90" s="15.3% reduction"/><K icon={ShieldCheck} t="SLA impact" v="Maintained" s="Deadline preserved"/></div><div className="notice"><b>Why GreenShift?</b><br/>GreenShift shifts the workload from the immediate execution window to a feasible lower-carbon, lower-cost window while preserving the workload deadline and resource constraints.</div></Panel>}
function windowLabel(job){return job&&job.region?"12:00–16:00":"12:00–16:00"}
function Reason({t}){return <p className="reason"><Check size={15}/>{t}</p>}
function Monitor({role,jobs,msg,setJobs}){
  const [j,setJ]=useState(jobs[0]);
  const [manage,setManage]=useState(false);
  const [window,setWindow]=useState("12:00–16:00");
  const [region,setRegion]=useState("");
  const [reason,setReason]=useState("");
  if(!j)return <Panel t="Job Monitoring">No workloads in this scope.</Panel>;
  const canControl=role!=="Normal User";
  const openManage=()=>{
    setWindow(j.window||"12:00–16:00");
    setRegion(j.region||R[0][0]);
    setReason("");
    setManage(true);
  };
  const apply=()=>{
    if(!reason.trim())return;
    const updated={...j,window,region};
    setJobs(prev=>prev.map(x=>x.id===j.id?updated:x));
    setJ(updated);
    setManage(false);
    msg("Schedule updated and audit record created");
  };
  return <><Top title="Job Monitoring" sub={role==="Normal User"?"Your complete execution history, with active jobs shown prominently.":role==="Company Admin"?"All active and historical jobs belonging to your company.":"Platform-wide live and historical execution control."} action={<button className="secondary" onClick={()=>msg("Monitoring refreshed")}><RefreshCw size={15}/> Refresh</button>}/><div className="monitor"><div>{jobs.map(x=><button className={j.id===x.id?"mrow sel":"mrow"} onClick={()=>setJ(x)} key={x.id}><span>●</span><div><b>{x.name}</b><small>{x.id} • {x.org}</small></div><em>{x.status}</em></button>)}</div><Panel t="Execution Details"><h2 className="jobtitle">{j.name}</h2><p>{j.id} • {j.user} • {j.team} • {j.region}</p><div className="progress"><span>Execution progress</span><b>{j.status==="Completed"?"100%":j.status==="Running"?"58%":"0%"}</b><i style={{width:j.status==="Completed"?"100%":j.status==="Running"?"58%":"0%"}}/></div><div className="details three">{[["Scheduled window",j.window||"12:00–16:00"],["Actual start",j.status==="Running"?"14:02":"—"],["Expected completion","16:00"],["Deadline",j.deadline],["CPU / Memory",j.cpu+" cores / "+j.memory],["Power / Carbon",j.power+" / 1.24 kg CO₂e"],["Status",j.status],["Priority",j.priority],["SLA","Within SLA"]].map(x=><div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b></div>)}</div><div className="timeline"><b>✓ Job accepted</b><b>✓ Schedule decided</b><b>{j.status==="Running"?"● Execution":"○ Execution"}</b><b>{j.status==="Completed"?"✓ Completion":"○ Completion"}</b></div>{canControl&&<div className="actions jobActions">{["Queued","Scheduled","Pending"].includes(j.status)&&<button className="secondary" onClick={()=>{setJobs(prev=>prev.map(x=>x.id===j.id?{...x,status:"Cancelled"}:x));setJ({...j,status:"Cancelled"});msg("Job cancelled and audit record created")}}><X size={15}/> Cancel</button>}{j.status==="Running"&&<button className="dangerBtn" onClick={()=>{const reason=window.prompt("Enter termination reason:","Platform/Company Admin intervention");if(reason){setJobs(prev=>prev.map(x=>x.id===j.id?{...x,status:"Terminated",terminationReason:reason}:x));setJ({...j,status:"Terminated",terminationReason:reason});msg("Job terminated and audit record created")}}}><Square size={15}/> Terminate Job</button>}{j.status==="Failed"&&<button className="secondary" onClick={()=>{setJobs(prev=>prev.map(x=>x.id===j.id?{...x,status:"Pending"}:x));setJ({...j,status:"Pending"});msg("Retry requested") }}><RotateCcw size={15}/> Retry</button>}<button className="secondary" onClick={openManage}><SlidersHorizontal size={15}/> Manage Schedule</button></div>}</Panel></div>{manage&&<div className="modalBackdrop" onClick={()=>setManage(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modalHead"><div><small>SCHEDULE MANAGEMENT</small><h2>{j.name}</h2><p>{j.id} • {j.user}</p></div><button className="icon" onClick={()=>setManage(false)}><X size={18}/></button></div><div className="details"><div><small>Current status</small><b>{j.status}</b></div><div><small>Current window</small><b>{j.window||"12:00–16:00"}</b></div><div><small>Current region</small><b>{j.region}</b></div><div><small>Deadline</small><b>{j.deadline}</b></div></div><div className="fields"><Field t="New Execution Window"><select value={window} onChange={e=>setWindow(e.target.value)}><option>08:00–12:00</option><option>12:00–16:00</option><option>16:00–20:00</option><option>20:00–00:00</option></select></Field><Field t="Execution Region"><select value={region} onChange={e=>setRegion(e.target.value)}>{R.map(r=><option key={r[0]}>{r[0]}</option>)}</select></Field><Field t="Change Reason"><textarea value={reason} onChange={e=>setReason(e.target.value)} placeholder="Required: explain why the schedule is being changed."/></Field></div><div className="notice"><b>Admin control</b><br/>Applying this change updates the workload's planned execution window and region. The reason is retained with the schedule-change audit event.</div><div className="actions"><button className="secondary" onClick={()=>setManage(false)}>Cancel</button><button className="primary" disabled={!reason.trim()} onClick={apply}>Apply Schedule <Check size={16}/></button></div></div></div>}</>}
function Carbon({role,reg}){return <><Top title="Carbon & Cost Data" sub={role==="Normal User"?"Only information relevant to your workloads and selected region.":role==="Company Admin"?"Company-wide environmental and financial impact.":"Platform-wide carbon and tariff data sources, freshness and impact."}/><div className="cards four">{[[Leaf,"Current carbon",reg[4]+" g","gCO₂e/kWh"],[Cloud,"Forecast low","285 g","14:00 local"],[Wallet,"Electricity price","₹7.65","modeled"],[Clock3,"Cheapest upcoming","22:00","ToD +₹0/unit"]].map((x,i)=><K key={i} icon={x[0]} t={x[1]} v={x[2]} s={x[3]}/>)}</div><div className="grid"><Panel t="Carbon Trend"><Chart/></Panel><Panel t={role==="Platform Admin"?"Data Source Health":"Tariff Windows"}>{role==="Platform Admin"?<><div className="sourceRow"><b>Southern India carbon signal</b><span className="healthy">Healthy • Fresh</span></div><div className="sourceRow"><b>Tariff configuration</b><span className="healthy">FY26-27 • Active</span></div><div className="sourceRow"><b>Forecast pipeline</b><span className="healthy">Operational</span></div></>:<div className="tariff"><b>06:00–10:00 <span>Peak +₹1/unit</span></b><b>10:00–18:00 <i>Normal +₹0/unit</i></b><b>18:00–22:00 <span>Peak +₹1/unit</span></b><b>22:00–06:00 <i>Night +₹0/unit</i></b></div>}</Panel></div></>}
function Audit({role,jobs}){let rows=jobs.slice(0,7).map((j,i)=>[j.id,["Submitted","Region selected","Carbon signal fetched","Tariff data evaluated","Candidate windows scored","Schedule selected","Dispatch request created"][i],"11:03:"+(12+i),role==="Platform Admin"?j.org:"GreenShift"]);return <><Top title="Audit & Trust" sub={role==="Normal User"?"Audit history for your workloads.":role==="Company Admin"?"Company-level traceability of workload and scheduling activity.":"Global audit history across all organizations and administrative actions."} action={<span className="verified"><ShieldCheck size={15}/> Hash chain verified</span>}/><div className="cards three"><K icon={ShieldCheck} t="Verified events" v="7 / 7" s="No breaks detected"/><K icon={Database} t="Audited jobs" v={jobs.length} s="100% coverage"/><K icon={Activity} t="Latest record" v="11:03:18" s="Today"/></div><Panel t="Decision Audit Trail"><table><thead><tr><th>Job</th>{role==="Platform Admin"&&<th>Organization</th>}<th>Event</th><th>Timestamp</th><th>Integrity</th></tr></thead><tbody>{rows.map(x=><tr key={x[0]+x[1]}><td>{x[0]}</td>{role==="Platform Admin"&&<td>{x[3]}</td>}<td>{x[1]}</td><td>{x[2]}</td><td className="greenText">✓ Verified</td></tr>)}</tbody></table></Panel><div className="notice big"><ShieldCheck/> <span><b>What is stored?</b><br/>Job constraints, signal timestamps, tariff version, candidate scores, selected slot, decision reason, schedule changes, overrides and execution events.</span></div></>}
function Alerts({role,msg}){let a=role==="Platform Admin"?[["Scheduler incident","2 scheduling requests exceeded decision-time threshold.","High"],["Carbon data check","One regional forecast source is stale.","Medium"],["Resource shortage","8 workloads affected in Southern India.","High"],["Audit healthy","No hash-chain integrity breaks detected.","Healthy"]]:role==="Company Admin"?[["Deadline risk","3 company workloads approach their deadlines.","High"],["Resource shortage","4 company workloads affected in Region A.","Medium"],["Carbon budget risk","2 workloads are nearing budget.","Medium"],["SLA preserved","Scheduled company jobs remain within SLA.","Healthy"]]:[["Deadline approaching","J1003 is approaching its deadline.","High"],["Scheduling completed","A feasible execution window was selected.","Info"],["Region unavailable","A selected resource pool is temporarily unavailable.","Medium"],["Job started","J1002 execution is active.","Healthy"]];return <><Top title="Alerts" sub="Problems and operational events within your authorized scope." action={<button className="secondary" onClick={()=>msg("All alerts reviewed")}><Check size={15}/> Mark reviewed</button>}/><div className="alerts">{a.map((x,i)=><div className={"alert "+(x[2]==="High"?"danger":"")} key={x[0]}><AlertTriangle size={18}/><div><b>{x[0]}</b><p>{x[1]}</p><small>Today • GreenShift monitoring</small></div><em>{x[2]}</em><X size={15}/></div>)}</div></>}
function UsersPage({role}){
  const initialUsers=[
    {id:1,name:"Priya N.",email:"priya@company.com",org:"Acme Analytics",team:"Data Engineering",userRole:"Normal User",status:"Active",joined:"Aug 12, 2026",lastActive:"Today, 11:42",workloads:12},
    {id:2,name:"Aarav Mehta",email:"aarav@company.com",org:"Acme Analytics",team:"ML Research",userRole:"Normal User",status:"Active",joined:"Jul 28, 2026",lastActive:"Today, 10:18",workloads:8},
    {id:3,name:"Company Admin",email:"admin@company.com",org:"Acme Analytics",team:"Platform Ops",userRole:"Company Admin",status:"Active",joined:"Jun 10, 2026",lastActive:"Today, 09:55",workloads:24},
    {id:4,name:"Kiran Dev",email:"kiran@beta.com",org:"Beta Systems",team:"Application Dev",userRole:"Normal User",status:"Active",joined:"Aug 03, 2026",lastActive:"Yesterday, 17:20",workloads:6},
    {id:5,name:"Neha Rao",email:"neha@company.com",org:"Acme Analytics",team:"Analytics",userRole:"Normal User",status:"Inactive",joined:"May 19, 2026",lastActive:"Aug 27, 2026",workloads:5},
    {id:6,name:"Rohan Shah",email:"rohan@company.com",org:"Acme Analytics",team:"Platform Ops",userRole:"Normal User",status:"Inactive",joined:"Apr 14, 2026",lastActive:"Aug 21, 2026",workloads:9}
  ];
  const [users,setUsers]=useState(initialUsers);
  const [showAdd,setShowAdd]=useState(false);
  const [profile,setProfile]=useState(null);
  const [form,setForm]=useState({name:"",email:"",team:"",userRole:"Normal User",org:"Acme Analytics",status:"Active"});
  const visible=users.filter(u=>role==="Platform Admin"||u.org==="Acme Analytics");
  const active=visible.filter(u=>u.status==="Active").length;
  const inactive=visible.filter(u=>u.status==="Inactive").length;
  const [q,setQ]=useState("");
  const [orgFilter,setOrgFilter]=useState("All Organizations");
  const orgOptions=[...new Set(visible.map(u=>u.org))].sort();
  const term=q.trim().toLowerCase();
  const list=visible.filter(u=>
    (u.name+" "+u.email+" "+u.org+" "+u.team+" "+u.userRole).toLowerCase().includes(term)&&
    (orgFilter==="All Organizations"||u.org===orgFilter)
  );
  const add=()=>{
    if(!form.name.trim()||!form.email.trim()) return;
    const u={...form,id:Date.now(),joined:"Today",lastActive:form.status==="Active"?"Today":"—",workloads:0};
    setUsers(prev=>[u,...prev]);
    setForm({name:"",email:"",team:"",userRole:"Normal User",org:"Acme Analytics",status:"Active"});
    setShowAdd(false);
  };
  const toggleStatus=()=>{
    if(!profile)return;
    const next=profile.status==="Active"?"Inactive":"Active";
    const updated={...profile,status:next,lastActive:next==="Active"?"Now":profile.lastActive};
    setUsers(prev=>prev.map(u=>u.id===profile.id?updated:u));
    setProfile(updated);
  };
  return <><Top title={role==="Company Admin"?"Users & Teams":"Users & Access"} sub={role==="Company Admin"?"Manage users and teams belonging to your company.":"Platform-wide users, organizations, teams and role access."} action={<button className="primary" onClick={()=>setShowAdd(true)}><Plus size={16}/> Add User</button>}/><div className="cards four"><K icon={Users} t="Total Users" v={visible.length} s="Authorized scope"/><K icon={CircleCheck} t="Active Users" v={active} s="Current access"/><K icon={Pause} t="Inactive Users" v={inactive} s="Access disabled"/><K icon={ShieldCheck} t="Access Health" v="100%" s="Role controlled"/></div><div className="grid"><Panel t="Users"><div className="toolbar"><div className="search"><Search size={16}/><input placeholder="Search by name, email, team or role..." value={q} onChange={e=>setQ(e.target.value)}/></div>{orgOptions.length>1&&<select value={orgFilter} onChange={e=>setOrgFilter(e.target.value)}><option>All Organizations</option>{orgOptions.map(o=><option key={o}>{o}</option>)}</select>}</div><table><thead><tr><th>User</th><th>Organization</th><th>Team</th><th>Role</th><th>Status</th><th>Action</th></tr></thead><tbody>{list.length?list.map(u=><tr key={u.id}><td><button className="userProfileLink" onClick={()=>setProfile(u)}><b>{u.name}</b><small>{u.email}</small></button></td><td>{u.org}</td><td>{u.team}</td><td>{u.userRole}</td><td><span className={u.status==="Active"?"greenText":"mutedStatus"}>● {u.status}</span></td><td><button className="link" onClick={()=>setProfile(u)}>Manage</button></td></tr>):<tr><td colSpan={6}><small>No users match the current search or organization filter.</small></td></tr>}</tbody></table></Panel><Panel t="Teams"><div className="sourceRow"><b>ML Research</b><span>12 users</span></div><div className="sourceRow"><b>Data Engineering</b><span>18 users</span></div><div className="sourceRow"><b>Platform Ops</b><span>9 users</span></div><div className="sourceRow"><b>Analytics</b><span>7 users</span></div></Panel></div>{showAdd&&<div className="modalBackdrop"><div className="modal"><div className="modalHead"><div><h2>Add User</h2><p>Create a user and assign their authorized access.</p></div><button className="icon" onClick={()=>setShowAdd(false)}><X size={18}/></button></div><div className="fields"><Field t="Full Name"><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Ananya Rao"/></Field><Field t="Email"><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="name@company.com"/></Field><Field t="Team"><input value={form.team} onChange={e=>setForm({...form,team:e.target.value})} placeholder="Team name"/></Field><Field t="Role"><select value={form.userRole} onChange={e=>setForm({...form,userRole:e.target.value})}><option>Normal User</option><option>Company Admin</option>{role==="Platform Admin"&&<option>Platform Admin</option>}</select></Field>{role==="Platform Admin"&&<Field t="Organization"><select value={form.org} onChange={e=>setForm({...form,org:e.target.value})}><option>Acme Analytics</option><option>Beta Systems</option><option>Northstar Finance</option><option>Vertex Labs</option></select></Field>}<Field t="Account Status"><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Active</option><option>Inactive</option></select></Field></div><div className="actions"><button className="secondary" onClick={()=>setShowAdd(false)}>Cancel</button><button className="primary" onClick={add}>Create User <Check size={16}/></button></div></div></div>}{profile&&<div className="modalBackdrop" onClick={()=>setProfile(null)}><div className="modal profileModal" onClick={e=>e.stopPropagation()}><div className="modalHead"><div><small>USER PROFILE</small><h2>{profile.name}</h2><p>{profile.email}</p></div><button className="icon" onClick={()=>setProfile(null)}><X size={18}/></button></div><div className="details">{[["Organization",profile.org],["Team",profile.team],["Role",profile.userRole],["Account status",profile.status],["Joined",profile.joined],["Last active",profile.lastActive],["Workloads submitted",profile.workloads],["Access scope",profile.userRole==="Platform Admin"?"Global platform":"Authorized organization"]].map(x=><div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b></div>)}</div><div className="notice"><b>Profile & access</b><br/>Manage this user's account status and review their organization, team, role and workload activity.</div><div className="actions"><button className={profile.status==="Active"?"dangerBtn":"primary"} onClick={toggleStatus}>{profile.status==="Active"?"Deactivate User":"Activate User"}</button><button className="secondary" onClick={()=>setProfile(null)}>Close</button></div></div></div>}</>}

function Analytics({jobs}){return <><Top title="Analytics" sub="Detailed workload, carbon, cost, SLA and resource analysis for your company."/><div className="cards four"><K icon={Database} t="Jobs this month" v="42" s="+12%"/><K icon={Leaf} t="Carbon reduction" v="18.4%" s="Average"/><K icon={Wallet} t="Cost savings" v="₹18,420" s="vs immediate execution"/><K icon={ShieldCheck} t="SLA compliance" v="98%" s="On time"/></div><div className="grid"><Panel t="Jobs & Carbon Trend"><Chart/></Panel><Panel t="Resource Utilization"><div className="factor">CPU utilization <i style={{width:"68%"}}/></div><div className="factor">Memory utilization <i style={{width:"54%"}}/></div><div className="factor">GPU utilization <i style={{width:"42%"}}/></div><div className="factor">Resource availability <i style={{width:"91%"}}/></div></Panel></div></>}
function Regions({role,reg,setReg}){return <><Top title="Regions & Resources" sub={role==="Normal User"?"Regions and resource capacity available for your workloads.":role==="Company Admin"?"Regions and computing resources available to your company.":"Global regions, clusters and resource capacity."}/><div className="regions">{R.map(r=><button className={reg[0]===r[0]?"region selected":"region"} onClick={()=>setReg(r)} key={r[0]}><Cloud size={18}/><div><b>{r[0]}</b><small>{r[2]} • {r[4]} gCO₂e/kWh</small></div>{reg[0]===r[0]&&<Check/>}</button>)}</div><Panel t="Selected Region Resources"><div className="details">{[["Region",reg[0]],["Carbon intensity",reg[4]+" gCO₂e/kWh"],["Electricity cost","₹7.65 / unit"],["Cluster status","Healthy"],["CPU capacity","72% available"],["Memory capacity","64% available"],["GPU capacity","41% available"],["Current jobs","18"]].map(x=><div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b></div>)}</div><p className="notice">Company Admin sees only allowed/restricted regions and company resource availability. Platform Admin sees the global infrastructure view.</p></Panel></>}
const ORG_SEED=[
 {name:"Acme Analytics",users:48,jobs:42,running:1,carbon:"18.4 kg",cost:"₹8,420",status:"Active",region:"Telangana"},
 {name:"Beta Systems",users:31,jobs:28,running:2,carbon:"12.7 kg",cost:"₹5,180",status:"Active",region:"Gujarat"},
 {name:"Northstar Finance",users:22,jobs:19,running:1,carbon:"9.8 kg",cost:"₹3,960",status:"Active",region:"California"},
 {name:"Vertex Labs",users:17,jobs:15,running:2,carbon:"6.4 kg",cost:"₹2,410",status:"Active",region:"Telangana"},
 {name:"Orion Retail",users:26,jobs:21,running:1,carbon:"11.2 kg",cost:"₹4,870",status:"Active",region:"West Bengal"}
];
const BLANK_ORG={name:"",region:R[0][0],users:"",status:"Active"};

function Organizations({jobs,msg}){
  const [orgs,setOrgs]=useState(ORG_SEED);
  const [q,setQ]=useState("");
  const [status,setStatus]=useState("All Status");
  const [creating,setCreating]=useState(false);
  const [form,setForm]=useState(BLANK_ORG);
  const [error,setError]=useState("");
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));
  const close=()=>{setCreating(false);setForm(BLANK_ORG);setError("")};

  const create=()=>{
    const name=form.name.trim();
    if(!name){setError("Enter an organization name.");return}
    if(orgs.some(o=>o.name.toLowerCase()===name.toLowerCase())){setError("An organization with that name already exists.");return}
    const seats=form.users===""?0:Number(form.users);
    if(!Number.isInteger(seats)||seats<0){setError("Seats must be a whole number of 0 or more.");return}
    setOrgs([{name,users:seats,jobs:0,running:0,carbon:"0.0 kg",cost:"₹0",status:form.status,region:form.region},...orgs]);
    close();
    if(msg)msg("Organization created");
  };

  const term=q.trim().toLowerCase();
  const list=orgs.filter(o=>
    (o.name+" "+o.region).toLowerCase().includes(term) &&
    (status==="All Status"||o.status===status)
  );

  return <>
    <Top title="Organizations" sub="Manage every organization connected to the GreenShift platform."
      action={<button className="primary" onClick={()=>setCreating(true)}><Plus size={16}/> Create Organization</button>}/>

    <div className="toolbar">
      <div className="search">
        <Search size={16}/>
        <input placeholder="Search organizations by name or region..." value={q} onChange={e=>setQ(e.target.value)}/>
      </div>
      <select value={status} onChange={e=>setStatus(e.target.value)}>
        <option>All Status</option><option>Active</option><option>Suspended</option>
      </select>
    </div>

    {list.length
      ? <div className="table"><table>
          <thead><tr><th>#</th><th>Organization</th><th>Users</th><th>Jobs</th><th>Running</th><th>Carbon avoided</th><th>Cost saved</th><th>Status</th></tr></thead>
          <tbody>{list.map((o,i)=><tr key={o.name}>
            <td>{i+1}</td>
            <td><b>{o.name}</b><small>{o.region}</small></td>
            <td>{o.users}</td>
            <td>{jobs.filter(j=>j.org===o.name).length||o.jobs}</td>
            <td>{o.running}</td>
            <td>{o.carbon}</td>
            <td>{o.cost}</td>
            <td className={o.status==="Active"?"greenText":"redText"}>{o.status}</td>
          </tr>)}</tbody>
        </table></div>
      : <div className="notice">No organizations match &ldquo;{q}&rdquo;{status!=="All Status"?" with status "+status:""}. Clear the search to see all {orgs.length}.</div>}

    {creating&&<div className="modalBackdrop" onClick={close}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modalHead">
          <div><h2>Create Organization</h2><p>Add an organization to the GreenShift platform.</p></div>
          <button className="icon" onClick={close}><X size={18}/></button>
        </div>
        <div className="fields">
          <Field t="Organization name"><input autoFocus value={form.name} onChange={e=>upd("name",e.target.value)} placeholder="e.g. Orion Retail"/></Field>
          <Field t="Primary region"><select value={form.region} onChange={e=>upd("region",e.target.value)}>{R.map(x=><option key={x[0]}>{x[0]}</option>)}</select></Field>
          <Field t="Initial seats"><input value={form.users} onChange={e=>upd("users",e.target.value)} placeholder="e.g. 25" inputMode="numeric"/></Field>
          <Field t="Status"><select value={form.status} onChange={e=>upd("status",e.target.value)}><option>Active</option><option>Suspended</option></select></Field>
        </div>
        {error&&<div className="formError" style={{marginTop:18}}>{error}</div>}
        <div className="actions" style={{marginTop:20}}>
          <button className="secondary" onClick={close}>Cancel</button>
          <button className="primary" onClick={create}>Create Organization <Check size={16}/></button>
        </div>
      </div>
    </div>}
  </>;
}
function Reports({role}){return <><Top title="Reports" sub={role==="Platform Admin"?"Platform and organization-level downloadable results.":"Company-level downloadable operational, financial and sustainability results."}/><div className="reportGrid">{["Workload Report","Job Execution Report","SLA Report","Cost & Savings Report","Immediate Execution vs GreenShift","Carbon Emissions Report","Carbon Avoided & Reduction","Region-wise Impact","Team-wise Impact","Monthly Impact"].map(x=><div className="reportCard" key={x}><FileText size={18}/><div><b>{x}</b><small>Download / share report</small></div><button className="link">Export</button></div>)}</div></>}
const PREF_LIST=[
  ["Email alerts","Receive workload notifications by email"],
  ["Deadline alerts","Notify me before a workload deadline"],
  ["Scheduling notifications","Notify me when a schedule changes"],
  ["Weekly impact summary","Carbon and cost savings digest every Monday"]
];

function Profile({role,msg}){
  const me=IDENTITY[role];
  const base={name:me.name,email:me.email,team:me.team,timezone:"Asia/Kolkata (IST)",region:R[0][0]};
  const [form,setForm]=useState(base);
  const [prefs,setPrefs]=useState({"Email alerts":true,"Deadline alerts":true,"Scheduling notifications":true,"Weekly impact summary":false});
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));
  const dirty=Object.keys(base).some(k=>form[k]!==base[k]);
  const admin=role!=="Normal User";

  return <>
    <Top title={admin?"Profile":"Profile & Settings"} sub="Your account details, workspace defaults and notification preferences."/>

    <div className="profileHead">
      <span className="profileAvatar">{me.initials}</span>
      <div>
        <h2>{me.name}</h2>
        <p>{me.email}</p>
        <div className="profileMeta">
          <span className="roleBadge"><ShieldCheck size={14}/>{role}</span>
          <span className="accessBadge">{me.org}</span>
          <span className="accessBadge">{me.team}</span>
          <span className="verified"><CircleCheck size={13}/>{me.status}</span>
        </div>
      </div>
      <div className="decisionStats">
        <b>{me.scope}<small>Access scope</small></b>
        <b>{me.workloads}<small>Workloads submitted</small></b>
        <b>{me.joined}<small>Member since</small></b>
        <b>{me.lastActive}<small>Last active</small></b>
      </div>
    </div>

    <div className="formgrid">
      <Panel t="Account details">
        <div className="fields">
          <Field t="Display name"><input value={form.name} onChange={e=>upd("name",e.target.value)}/></Field>
          <Field t="Email"><input type="email" value={form.email} onChange={e=>upd("email",e.target.value)}/></Field>
          <Field t="Team"><input value={form.team} onChange={e=>upd("team",e.target.value)}/></Field>
          <Field t="Time zone"><select value={form.timezone} onChange={e=>upd("timezone",e.target.value)}>{["Asia/Kolkata (IST)","UTC","America/Los_Angeles (PT)","Australia/Adelaide (ACST)"].map(x=><option key={x}>{x}</option>)}</select></Field>
          <Field t="Default execution region" wide><select value={form.region} onChange={e=>upd("region",e.target.value)}>{R.map(x=><option key={x[0]}>{x[0]}</option>)}</select></Field>
        </div>
        <div className="actions" style={{marginTop:18}}>
          <button className="secondary" onClick={()=>setForm(base)} disabled={!dirty}>Discard</button>
          <button className="primary" onClick={()=>{msg&&msg("Profile updated")}} disabled={!dirty}><Check size={15}/> Save changes</button>
        </div>
      </Panel>

      <Panel t="Security">
        <div className="rule"><b>Password<small>Last changed 24 days ago</small></b><button className="secondary" onClick={()=>msg&&msg("Password reset link sent")}>Change</button></div>
        <div className="rule"><b>Two-factor authentication<small>Not enabled on this account</small></b><button className="secondary" onClick={()=>msg&&msg("Two-factor setup started")}>Enable</button></div>
        <div className="rule"><b>Active sessions<small>Signed in on 2 devices</small></b><button className="secondary" onClick={()=>msg&&msg("Signed out of other devices")}>Sign out others</button></div>
        <div className="notice" style={{marginTop:14}}>{admin?"This page covers your personal account only. Organization-wide configuration lives on the Settings page.":"Your role and organization are managed by your administrator and cannot be changed here."}</div>
      </Panel>

      <Panel t="Notification preferences">
        <div className="toggleList">
          {PREF_LIST.map(([name,desc])=><div className="toggleRow" key={name}>
            <div><b>{name}</b><small>{desc}</small></div>
            <button className={"toggle "+(prefs[name]?"on":"")} onClick={()=>setPrefs(p=>({...p,[name]:!p[name]}))} aria-label={name}><span/></button>
          </div>)}
        </div>
      </Panel>
    </div>
  </>;
}
function NotificationsToggles(){
  const [items,setItems]=useState({["SLA alerts"]:true,["Carbon alerts"]:true,["Job alerts"]:true,["Scheduling alerts"]:true,["Email notifications"]:false,["Role permissions"]:true});
  return <div className="toggleList">{Object.entries(items).map(([name,on])=><div className="toggleRow" key={name}><div><b>{name}</b><small>{on?"Notifications enabled for this scope.":"Notifications disabled for this scope."}</small></div><button className={"toggle "+(on?"on":"")} onClick={()=>setItems(s=>({...s,[name]:!s[name]}))}><span/></button></div>)}</div>}
function SettingsPage({role}){return <><Top title="Settings" sub={role==="Company Admin"?"Company-level configuration only.":"Global platform configuration and policies."}/><div className="grid"><Panel t={role==="Company Admin"?"Company Settings":"Platform Settings"}>{["Default region","Carbon preference","Cost preference","Carbon / cost weights","Maximum scheduling delay","Safety buffer","Scheduling rules"].map(x=><div className="rule" key={x}><b>{x}<small>Configuration value</small></b><button className="secondary">Edit</button></div>)}</Panel><Panel t="Notifications & Access"><NotificationsToggles/></Panel></div></>}
function Fieldset(){return null}
createRoot(document.getElementById("root")).render(<App/>);