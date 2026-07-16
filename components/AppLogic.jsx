'use client';
import React from 'react';
import Root from './generated/Root';

export default class AppLogic extends React.Component {
  constructor(props){
    super(props);
    this.threadRef = React.createRef();
    this.chatRef = React.createRef();
    this.scrubRef = React.createRef();
    this.cmdFileRef = React.createRef();
    this.chatFileRef = React.createRef();
    this.scrubFileRef = React.createRef();
    this.paletteRef = React.createRef();
  }
  state = {
    persona:'diana',
    sidebarOpen:false,
    view:'home', dealId:'sunrise', activeAgent:'data',
    cmd:'', uwInput:'', chatInput:'', scrubInput:'',
    composerAgent:'all', agentMenuOpen:false,
    onboardOpen:false, onboardDone:false, freshSignup:false, sourcePromptDismissed:false,
    cmdFiles:[], chatFiles:[], scrubFiles:[], citeSources:true, convQuery:'', convFilter:'all',
    agQuery:'', agFilter:'all',
    paletteOpen:false, paletteQuery:'',
    healthResolved:[], reviewOpen:false, reviewValue:'$151,200.00', healthExportOpen:false,
    uwThread:[], chatThread:[], scrubThread:[],
    scrubVariant:'clean', scrubFeedback:{}, scrubPopup:null, scrubHealthResolved:[], forgedReviewOpen:false,
    scrubOcrOpen:false, scrubOcrResolved:false, scrubOcrValue:'$11,200.00', retargetIndustry:null, srcEdits:{}, srcExpanded:[], srcPanel:null, srcPanelField:null, srcSplit:0.54,
    scenario:60000, factorAdj:0, decided:false, scrubDecided:false,
    typing:false, typingLabel:'', chatTyping:false, chatTypingLabel:'', scrubTyping:false, scrubTypingLabel:'',
    decidedToday:9, queueCount:14, toast:null, toastCta:null, taskSnack:null,
    // header notifications
    notifOpen:false,
    notifs:[
      {id:'scrub-cinnamon',mono:'Sc',tone:'warn',title:'Scrub ready \u2014 missing one statement',sub:'Cinnamon Trail Coffee \u00b7 $40,000 \u00b7 Forward Line',time:'8:14 AM',read:false,cta:'scrub-cinnamon'},
      {id:'renewals',mono:'Rn',tone:'neu',title:'Renewal outreach drafted \u2014 3 merchants',sub:'Calzona Tacos, Eden Greens, Brookside Books',time:'Yesterday',read:true,cta:'renewals'},
    ],
    // broker auto-intake pipeline
    intakeStep:0, intakeRunning:false, intakeDone:false,
    // funder fundability
    fundDealId:'cinnamon', fundDecision:null, denyReason:'', denyStep:'choose',
    // agent configuration
    cfgAgentId:'scrubbing', cfgDraft:null, cfgSaved:false, agentAutonomy:{},
    // integrations — Gmail is a REAL Google OAuth connection (no mock data)
    intPickerOpen:false, gmailOpen:false, gmail:null, gmailClientId:'', gmailDraftSince:'2026-04-01', gmailBusy:null, gmailError:null,
    // simulated Google account chooser (used when no OAuth client is configured)
    gPickerOpen:false, gPickerBusy:null, gPickerOther:false, gPickerEmail:'',
    // intake confirm-autonomy task (pick docs from a Gmail thread)
    intakeTaskOpen:false, intakeTaskStep:'threads', intakeThreadId:null, intakeDocsSel:[], intakeFrom:'', intakeTo:'', intakeTaskDone:false, intakeQuery:'',
    // auth (demo — opens on login, sign out returns here)
    authed:false, authScreen:'login', authStep:'email',
    authEmail:'marcus@vega.capital', authPw:'vega-capital-demo', authEmail2:'', authName:'', authPw2:'', authCode:'',
    authShowPw:false, authBusy:null, authError:null, authNotice:null, authMail:false,
    // add knowledge
    kAddOpen:false, kAddStep:'intent', kFunderMode:'upload', kAddError:null, kSource:'file', kLinkInput:'',
    kfName:'', kfTier:'Tier 1 \u00b7 A-paper', kfMax:'', kfFactor:'', kfMinRev:'', kfPos:'',
    kStagedDocs:[], kDocAgents:[], addedFunders:[], addedDocs:[],
    // workflows — gallery + canvas
    wfView:'list', wfId:null, wfNode:null, wfZoom:1, wfPaletteOpen:true,
    wfAuto:{}, wfCond:{}, wfAdded:{}, wfStatus:{}, wfRunning:false, wfActive:null, wfDone:[],
    renewals:[
      {id:'calzona', name:'Calzona Tacos', channel:'WhatsApp', repaid:82, health:91, days:24, offer:'$35,000 · 1.30 · 8 mo',
       draft:'Hey Marco, you\u2019re 82% through your current advance with strong sales. I can line up a $35k renewal at a slightly better rate before your maturity \u2014 want to chat tomorrow?', approved:false, skipped:false},
      {id:'eden', name:'Eden Greens', channel:'WhatsApp', repaid:78, health:86, days:31, offer:'$22,000 · 1.32 · 8 mo',
       draft:'Hi Priya, with your repayment performance you\u2019re a strong fit for a $22k renewal. I\u2019d like to walk you through the terms \u2014 do you have 10 min this week?', approved:false, skipped:false},
      {id:'brook', name:'Brookside Books', channel:'Email', repaid:76, health:79, days:37, offer:'$15,000 · 1.34 · 9 mo',
       draft:'Hi Janelle, you\u2019re approaching the renewal window on your current advance. Revenue has stayed consistent and I can put together a fresh $15k offer \u2014 worth a quick call?', approved:false, skipped:false},
    ],
  };

  agents = [
    {id:'conversationintake',name:'Conversation Intake',mono:'Ci',desc:'Monitors connected WhatsApp & email threads, detects intent, and kicks off deal intake automatically.',autonomy:'Automate',stat:'on watch'},
    {id:'underwriting',name:'Underwriting',mono:'Uw',desc:'First-pass approve, decline, or counter with a confidence score and structured rationale.',autonomy:'Confirm',stat:'128 analyses'},
    {id:'scrubbing',name:'Scrubbing',mono:'Sc',desc:'Validates submissions against funder criteria and flags gaps before delivery.',autonomy:'Automate',stat:'342 scrubs'},
    {id:'docparse',name:'Document Parsing',mono:'Dp',desc:'Extracts and normalizes bank-statement data into a clean underwriting input.',autonomy:'Automate',stat:'1.2k docs'},
    {id:'infocollect',name:'Information Collection',mono:'Ic',desc:'Chases missing documents from merchants on their preferred channel.',autonomy:'Automate',stat:'96 deals'},
    {id:'outreach',name:'Outreach',mono:'Ou',desc:'Composes and sends personalized, multi-channel outreach sequences.',autonomy:'Confirm',stat:'1.8k sent'},
    {id:'crosssale',name:'Cross-Sale Discovery',mono:'Cx',desc:'Surfaces expansion opportunities hiding in the funded portfolio.',autonomy:'Suggest',stat:'24 found'},
    {id:'renewal',name:'Renewal',mono:'Rn',desc:'Monitors maturity windows and initiates renewal outreach on time.',autonomy:'Confirm',stat:'17 in pipeline'},
    {id:'dealhealth',name:'Deal Health',mono:'Dh',desc:'Tracks payment and revenue signals across every active deal.',autonomy:'Suggest',stat:'212 monitored'},
    {id:'funder',name:'Funder Intelligence',mono:'Fn',desc:'Matches a deal profile to the highest-probability funders.',autonomy:'Suggest',stat:'38 programs'},
    {id:'data',name:'Data Intelligence',mono:'Da',desc:'Answers natural-language questions about your pipeline and portfolio.',autonomy:'Suggest',stat:'on demand'},
    {id:'advisory',name:'Advisory',mono:'Ad',desc:'Plain-language guidance on terms, structure, funder choice, and strategy.',autonomy:'Confirm',stat:'on demand'},
  ];

  queueData = [
    {id:'sunrise',name:'Sunrise Auto Repair',amount:60000,stage:'Ready to underwrite',stageKind:'ready',time:'9:12 AM'},
    {id:'coastal',name:'Coastal Dental Group',amount:120000,stage:'Escalated',stageKind:'bad',time:'8:30 AM'},
    {id:'verde',name:'Verde Landscaping',amount:35000,stage:'Missing docs',stageKind:'warn',time:'8:54 AM'},
    {id:'brick',name:'Brick & Mortar Cafe',amount:28000,stage:'Scrubbed',stageKind:'ok',time:'9:08 AM'},
    {id:'summit',name:'Summit Logistics',amount:85000,stage:'Health flag',stageKind:'warn',time:'8:40 AM'},
    {id:'bella',name:'Bella Boutique',amount:22000,stage:'In review',stageKind:'neu',time:'Yesterday'},
  ];

  scrubQueue = [
    {id:'cinnamon',name:'Cinnamon Trail Coffee',amount:40000,industry:'Food & Bev',funder:'Forward Line',stage:'Ready to scrub',stageKind:'ready',time:'8:14 AM'},
    {id:'sofia',name:'Sofia\u2019s Bakery',amount:25000,industry:'Food & Bev',funder:'(matching)',stage:'Collecting docs',stageKind:'warn',time:'7:42 AM'},
    {id:'hayden',name:'Hayden Auto Wash',amount:55000,industry:'Auto svc',funder:'Pinnacle Advance',stage:'Awaiting funder',stageKind:'neu',time:'Yesterday'},
    {id:'riverside',name:'Riverside Salon',amount:30000,industry:'Beauty',funder:'Capital Stack',stage:'Submitted',stageKind:'neu',time:'Yesterday'},
    {id:'calzona',name:'Calzona Tacos',amount:0,industry:'Food & Bev',funder:'\u2014',stage:'Renewal eligible',stageKind:'ok',time:'Today'},
    {id:'harbor',name:'Harborlight Print',amount:18000,industry:'Print',funder:'Bedrock',stage:'Declined',stageKind:'bad',time:'Yesterday'},
  ];

  // ===== Funder (Talia) inbound deals — received from brokers via WhatsApp =====
  inboundDeals = [
    {id:'cinnamon',name:'Cinnamon Trail Coffee',broker:'Marcus Vega · Vega Capital',amount:40000,industry:'Food & Bev',score:82,band:'Fundable',bandKind:'ok',received:'9:02 AM',channel:'WhatsApp'},
    {id:'lumen',name:'Lumen Yoga Studio',broker:'Marcus Vega · Vega Capital',amount:32000,industry:'Fitness',score:74,band:'Fundable',bandKind:'ok',received:'8:48 AM',channel:'WhatsApp'},
    {id:'orchard',name:'Orchard Hardware',broker:'Dana Lee · Summit Brokers',amount:90000,industry:'Retail',score:61,band:'Review',bandKind:'warn',received:'8:21 AM',channel:'WhatsApp'},
    {id:'pixel',name:'Pixel Print Co.',broker:'Dana Lee · Summit Brokers',amount:120000,industry:'Print',score:43,band:'Weak',bandKind:'bad',received:'7:55 AM',channel:'WhatsApp'},
    {id:'maple',name:'Maple & Co. Salon',broker:'Marcus Vega · Vega Capital',amount:28000,industry:'Beauty',score:79,band:'Fundable',bandKind:'ok',received:'Yesterday',channel:'WhatsApp'},
  ];

  // ===== Broker auto-intake pipeline stages =====
  intakeStages = [
    {mono:'Ci',agent:'Conversation Intake Agent',title:'Monitoring WhatsApp Business',detail:'Watching Pat\u2019s thread — detected an application keyword and 4 PDF attachments.',result:'Trigger matched'},
    {mono:'Ic',agent:'Information Collection Agent',title:'Pulled documents from WhatsApp',detail:'Application + 4 bank statements (Feb–May) ingested from WhatsApp Business.',result:'5 docs in'},
    {mono:'Dp',agent:'Document Parsing Agent',title:'Parsed bank statements',detail:'Normalized revenue, deposits, NSFs and balances at 97.8% extraction confidence.',result:'$82.4k avg rev'},
    {mono:'Sc',agent:'Scrubbing Agent',title:'Scrubbed against funder criteria',detail:'Matched to 3 funder programs. One soft flag — missing the most-recent month.',result:'88 / 100'},
    {mono:'Uw',agent:'Underwriting Agent',title:'First-pass underwrite',detail:'Recommends $40k at 1.30, 8-month term. Confidence 84%.',result:'Approve · 84%'},
    {mono:'Fn',agent:'Funder Routing Agent',title:'Sent to recognized funders',detail:'Underwritten package delivered to Pinnacle Advance, Forward Line & Bedrock on WhatsApp Business.',result:'3 funders'},
  ];

  // ===== WhatsApp transcript shown beside the pipeline =====
  whatsappMsgs = [
    {from:'them',text:'Hi Marcus, ready to apply for working capital for the cafe ☕',time:'8:58'},
    {from:'me',text:'Great! Send me your signed application and last 4 bank statements here and my system takes it from there.',time:'8:59'},
    {from:'them',text:'Application.pdf',time:'9:00',doc:true},
    {from:'them',text:'BankStmt_Feb.pdf · BankStmt_Mar.pdf · BankStmt_Apr.pdf · BankStmt_May.pdf',time:'9:01',doc:true},
    {from:'me',text:'Got it all — give me a few minutes and I\u2019ll have offers back for you.',time:'9:02',auto:true},
  ];

  // ===== Per-agent configuration + prompt =====
  agentConfig = {
    conversationintake:{autonomy:'Automate',model:'Claude Sonnet 4.6',tools:['WhatsApp Business','Gmail','HubSpot write'],
      prompt:'You are the Conversation Intake Agent. Continuously monitor the broker\u2019s connected WhatsApp Business and email threads. Detect when a merchant is starting an application or sending documents, classify the intent, and trigger the deal-intake workflow. Pull every attachment into the deal record. Never reply on the broker\u2019s behalf without an approved template; your job is to detect, capture, and route.',
      guard:[{k:'Auto-trigger intake on attachment',v:'On'},{k:'Reply only with approved templates',v:'On'}]},
    underwriting:{autonomy:'Confirm',model:'Claude Opus 4.6',tools:['LendSaaS write','Bank-stmt data','Funder criteria KB'],
      prompt:'You are the Underwriting Agent for an MCA funder. Given parsed bank-statement data and a scrub result, produce a first-pass recommendation (approve / decline / escalate) with an advance amount, factor rate, term, a confidence score, and a structured rationale. Weigh revenue consistency, average daily balance, NSF frequency, and stacked positions. Escalate any deal below 72% confidence or above $100k exposure to a human supervisor. Never fund — only recommend.',
      guard:[{k:'Auto-escalate below confidence',v:'72%'},{k:'Max exposure without sign-off',v:'$100,000'}]},
    scrubbing:{autonomy:'Automate',model:'Claude Sonnet 4.6',tools:['Funder criteria KB','HubSpot write'],
      prompt:'You are the Scrubbing Agent. Validate a submission against the target funder\u2019s published criteria before it is delivered. Check minimum revenue, time in business, active positions, NSF limits, permitted industries, and the most-recent-month requirement. Produce a 0–100 scrubcard and flag every gap with a concrete fix. Do not submit on the broker\u2019s behalf — hand back a clean, funder-ready package.',
      guard:[{k:'Block submission on hard fail',v:'On'},{k:'Allow override with justification',v:'On'}]},
    docparse:{autonomy:'Automate',model:'Claude Sonnet 4.6',tools:['OCR','Bank-stmt schema'],
      prompt:'You are the Document Parsing Agent. Extract and normalize bank-statement data into a structured underwriting input: monthly revenue, average daily balance, deposit count, NSFs, negative days, and detected positions. Report an extraction-confidence score and flag any statement that parses below 95% for human review.',
      guard:[{k:'Flag below extraction confidence',v:'95%'}]},
    outreach:{autonomy:'Confirm',model:'Claude Sonnet 4.6',tools:['WhatsApp Business','Gmail','HubSpot write'],
      prompt:'You are the Outreach Agent. Compose personalized, compliant outreach to merchants on their preferred channel. Match the broker\u2019s voice, never overstate terms, and always disclose that an offer is subject to underwriting. Hand drafts back for approval before anything sends.',
      guard:[{k:'Require approval before send',v:'On'},{k:'Max messages / merchant / week',v:'3'}]},
  };

  // ===== Workflows — gallery + node-graph canvas =====
  workflows = [
    {id:'wa-intake',name:'WhatsApp deal intake → funder routing',status:'Active',runs:'128 runs · 7 days',owner:'Marcus Vega',
     desc:'A new merchant sends an application on WhatsApp; six agents intake, parse, scrub, underwrite, and route it to funders — hands-free until the two approval gates.',
     chain:['Ci','Ic','Dp','Sc','Uw','Fn'], trigger:'New WhatsApp message with attachment', steps:8, gates:2},
    {id:'renewal-30',name:'30-day renewal outreach',status:'Active',runs:'46 runs · 7 days',owner:'Renewal Agent',
     desc:'Watches every active advance and, 30 days from maturity, drafts a personalized renewal offer for the broker to approve and send.',
     chain:['Rn','Dh','Ou'], trigger:'30 days before advance maturity', steps:5, gates:1},
    {id:'health-watch',name:'Deal health early-warning',status:'Active',runs:'212 monitored',owner:'Deal Health Agent',
     desc:'Scans the funded portfolio daily for slipping payments or revenue and opens a broker task the moment a deal starts trending toward default.',
     chain:['Dh','Ou'], trigger:'Daily portfolio scan · 6:00 AM', steps:4, gates:0},
    {id:'stip-chase',name:'Missing-document chase',status:'Paused',runs:'—',owner:'Information Collection',
     desc:'When a submission is missing a stipulation, chases the merchant on their preferred channel and keeps reminding until the document lands.',
     chain:['Ic','Ou'], trigger:'Missing stipulation detected', steps:4, gates:1},
  ];
  // node graphs — trigger + vertical spine + terminal + conditional branches
  workflowGraphs = {
    'wa-intake':{
      trigger:{label:'New WhatsApp message with attachment', source:'WhatsApp Business'},
      spine:[
        {id:'ci',mono:'Ci',agent:'Conversation Intake',label:'Detect application intent and capture the thread',auto:'Automate',cond:'Message has application + attachment',model:'Claude Sonnet 4.6'},
        {id:'ic',mono:'Ic',agent:'Information Collection',label:'Pull every document out of the thread',auto:'Automate',cond:'\u2265 1 bank statement attached',model:'Claude Sonnet 4.6'},
        {id:'dp',mono:'Dp',agent:'Document Parsing',label:'Parse & normalize the bank statements',auto:'Automate',cond:'Extraction confidence \u2265 95%',model:'Claude Sonnet 4.6'},
        {id:'sc',mono:'Sc',agent:'Scrubbing',label:'Scrub the submission against funder criteria',auto:'Automate',cond:'No hard decline gate hit',model:'Claude Sonnet 4.6'},
        {id:'uw',mono:'Uw',agent:'Underwriting',label:'Produce a first-pass recommendation',auto:'Confirm',cond:'Confidence \u2265 72%',model:'Claude Opus 4.6'},
      ],
      end:{id:'end',mono:'Fn',agent:'Funder Routing',label:'Deliver the underwritten package to funders',auto:'Confirm',cond:'Broker approves the send'},
      branches:[
        {id:'b-sc',from:'sc',when:'if hard fail',label:'Return to broker',desc:'Send the decline reasons back on WhatsApp so the broker can cure the file.'},
        {id:'b-uw',from:'uw',when:'if < 72%',label:'Escalate to a human',desc:'Route low-confidence deals to a senior underwriter for a manual look.'},
      ],
      stats:{runs:'128',auto:'94%',avg:'\u2248 6 min'},
    },
    'renewal-30':{
      trigger:{label:'30 days before advance maturity', source:'Schedule'},
      spine:[
        {id:'rn',mono:'Rn',agent:'Renewal',label:'Flag advances entering the renewal window',auto:'Automate',cond:'\u2265 75% of advance repaid',model:'Claude Sonnet 4.6'},
        {id:'dh',mono:'Dh',agent:'Deal Health',label:'Confirm repayment & revenue health',auto:'Automate',cond:'Health score \u2265 80',model:'Claude Sonnet 4.6'},
        {id:'ou',mono:'Ou',agent:'Outreach',label:'Draft a personalized renewal offer',auto:'Confirm',cond:'Broker approves the copy',model:'Claude Sonnet 4.6'},
      ],
      end:{id:'end',mono:'Ou',agent:'Outreach',label:'Send on the merchant\u2019s preferred channel',auto:'Confirm',cond:'Broker approves the send'},
      branches:[
        {id:'b-dh',from:'dh',when:'if health < 80',label:'Hold & flag',desc:'Skip outreach and raise a review task instead of offering a renewal.'},
      ],
      stats:{runs:'46',auto:'71%',avg:'\u2248 2 min'},
    },
    'health-watch':{
      trigger:{label:'Daily portfolio scan · 6:00 AM', source:'Schedule'},
      spine:[
        {id:'dh',mono:'Dh',agent:'Deal Health',label:'Score payment & revenue signals across every active deal',auto:'Automate',cond:'Runs daily',model:'Claude Sonnet 4.6'},
      ],
      end:{id:'end',mono:'Dh',agent:'Deal Health',label:'Write the portfolio health summary',auto:'Automate',cond:'No action needed'},
      branches:[
        {id:'b-dh',from:'dh',when:'if risk rising',label:'Notify broker + open task',desc:'Push an alert and open a Tasks item the instant a deal trends toward default.'},
      ],
      stats:{runs:'212',auto:'100%',avg:'nightly'},
    },
    'stip-chase':{
      trigger:{label:'Missing stipulation detected', source:'System'},
      spine:[
        {id:'ic',mono:'Ic',agent:'Information Collection',label:'Identify which stipulations are missing',auto:'Automate',cond:'Submission incomplete',model:'Claude Sonnet 4.6'},
        {id:'ou',mono:'Ou',agent:'Outreach',label:'Draft a document request to the merchant',auto:'Confirm',cond:'Broker approves the copy',model:'Claude Sonnet 4.6'},
      ],
      end:{id:'end',mono:'Ic',agent:'Information Collection',label:'Track receipt and remind until it lands',auto:'Automate',cond:'Until document received'},
      branches:[
        {id:'b-ou',from:'ou',when:'if no reply in 48h',label:'Second reminder',desc:'Escalate the channel and re-send once the first request goes cold.'},
      ],
      stats:{runs:'\u2014',auto:'paused',avg:'\u2014'},
    },
  };
  // palette of step types the builder can add to the canvas
  wfPalette = [
    {kind:'agent',name:'Agent step',glyph:'Ag',desc:'Hand work to a specialist agent'},
    {kind:'decision',name:'Condition',glyph:'?',desc:'Branch on a rule or threshold'},
    {kind:'human',name:'Human approval',glyph:'\u2713',desc:'Pause for a person to confirm'},
    {kind:'action',name:'Action',glyph:'\u2192',desc:'Write, send, or route an output'},
    {kind:'delay',name:'Delay / wait',glyph:'\u23f1',desc:'Hold for a time or an event'},
  ];
  workflowSteps = [
    {mono:'Ci',agent:'Conversation Intake',label:'Detect application in WhatsApp thread',auto:'Automate',cond:'Message contains application + attachment'},
    {mono:'Ic',agent:'Information Collection',label:'Ingest documents from WhatsApp Business',auto:'Automate',cond:'≥ 1 statement attached'},
    {mono:'Dp',agent:'Document Parsing',label:'Parse & normalize statements',auto:'Automate',cond:'Extraction ≥ 95%'},
    {mono:'Sc',agent:'Scrubbing',label:'Scrub against funder criteria',auto:'Automate',cond:'No hard fail'},
    {mono:'Uw',agent:'Underwriting',label:'First-pass underwrite',auto:'Confirm',cond:'Confidence ≥ 72%'},
    {mono:'Fn',agent:'Funder Routing',label:'Send package to recognized funders',auto:'Confirm',cond:'Broker approves'},
  ];

  fmtMoney(n){ return '$'+n.toLocaleString('en-US'); }


  recFor(amount){
    const map={
      45000:{factor:1.28,term:8,conf:93,debit:14,decision:'Approve',extra:null},
      60000:{factor:1.32,term:9,conf:87,debit:19,decision:'Approve',extra:null},
      75000:{factor:1.36,term:10,conf:71,debit:24,decision:'Approve with conditions',extra:'Combined daily debit reaches 24% of average daily deposits — recommend supervisor co-sign before funding.'},
    };
    const m=map[amount]; const payback=amount*m.factor; const days=Math.round(m.term*21.7); const daily=Math.round(payback/days);
    return {amount,factor:m.factor,term:m.term,conf:m.conf,debit:m.debit,decision:m.decision,extra:m.extra,payback,daily};
  }

  componentDidMount(){
    window.addEventListener('keydown', this.paletteHotkey);
    // restore Gmail integration (client id + connection metadata persist across reloads)
    try{
      const gid=localStorage.getItem('atlas_g_client_id')||'';
      const gml=JSON.parse(localStorage.getItem('atlas_gmail_integration')||'null');
      if(gid||gml) this.setState({gmailClientId:gid, gmail:gml, gmailDraftSince:(gml&&gml.since)||this.state.gmailDraftSince});
    }catch(_){}
    try{
      const aa=JSON.parse(localStorage.getItem('easymca_agent_autonomy')||'null');
      if(aa && typeof aa==='object'){ Object.keys(aa).forEach(id=>{ if(this.agentConfig[id]) this.agentConfig[id]={...this.agentConfig[id], autonomy:aa[id]}; }); this.setState({agentAutonomy:aa}); }
    }catch(_){}
    this.setState({
      uwThread:[
        {kind:'health'},
        {kind:'docParse'},
        {kind:'infoCollect', items:[
          {label:'Application', s:'pass', d:'Signed by P. Cortez (owner) \u00b7 all fields complete'},
          {label:'Bank statements', s:'pass', d:'4 / 4 received \u00b7 Feb\u2013May 2026 \u00b7 parsed at 98.2%'},
          {label:'Voided check', s:'pass', d:'Verified \u00b7 routing matches application'},
          {label:'Owner ID', s:'pass', d:'Driver\u2019s license on file'},
        ], note:'Package is complete. Nothing waiting on the merchant.'},
        {kind:'scorecard', criteria:[
          {c:'Min monthly revenue ≥ $50k',s:'pass',n:'$148.2k'},
          {c:'Time in business ≥ 2 yrs',s:'pass',n:'6.3 yrs'},
          {c:'Active positions ≤ 3',s:'pass',n:'2'},
          {c:'NSFs ≤ 5 / month',s:'warn',n:'3 in Mar'},
          {c:'Industry permitted',s:'pass',n:'Auto svc'},
          {c:'Negative days ≤ 3',s:'pass',n:'2'},
        ]},
        {kind:'agentText', text:'I\u2019ve reviewed the four parsed statements, the intake package, and the scrub. The deal is clean enough to underwrite \u2014 say the word and I\u2019ll run a full first-pass recommendation.', confidence:null},
      ],
      scrubThread:this.scrubSeed('clean'),
    });
  }
  scrubSeed(variant){
    if(variant==='flagged'){
      return [
        {kind:'infoCollectM'},
        {kind:'appCheck'},
        {kind:'defaultCheck'},
        {kind:'docParseM'},
        {kind:'trueDeposits'},
        {kind:'recurringDebits'},
        {kind:'declineRules'},
        {kind:'agentText', text:'This one doesn\u2019t clear the SOP. Three hard gates fail: the trucking revenue floor ($142k vs the $200k minimum), a prior default inside 24 months, and a DataMerch forged-document report on the bank statements. The resolution letter helps the default but doesn\u2019t override the forgery flag. My recommendation is decline as-submitted \u2014 or escalate to a B/C-paper funder that accepts the resolution letter, only after the statements are re-verified from source.', confidence:null, agent:'Scrubbing Agent', mono:'Sc'},
        {kind:'health'},
      ];
    }
    return [
      {kind:'infoCollectM'},
      {kind:'appCheck'},
      {kind:'defaultCheck'},
      {kind:'docParseM'},
      {kind:'trueDeposits'},
      {kind:'recurringDebits'},
      {kind:'declineRules'},
      {kind:'agentText', text:'Stepped through the 9-gate SOP scrub. Eight gates pass cleanly; the only open item is the June 2026 statement \u2014 Forward Line needs the most-recent month. Say \u201cscrub against Forward Line\u201d to run the funder-fit verdict, or \u201cping the merchant\u201d and I\u2019ll chase June over WhatsApp.', confidence:null, agent:'Scrubbing Agent', mono:'Sc'},
      {kind:'health'},
    ];
  }
  componentDidUpdate(){
    if(this.threadRef.current && this._uwScroll){
      this.threadRef.current.scrollTop = this._uwScroll==='top' ? 0 : this.threadRef.current.scrollHeight;
      this._uwScroll=null;
    }
    if(this.chatRef.current) this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight;
    if(this.scrubRef && this.scrubRef.current && this._scrubScroll){
      this.scrubRef.current.scrollTop = this._scrubScroll==='top' ? 0 : this.scrubRef.current.scrollHeight;
      this._scrubScroll=null;
    }
  }
  paletteHotkey=(e)=>{ if((e.metaKey||e.ctrlKey) && (e.key==='k'||e.key==='K')){ e.preventDefault(); this.setState(s=>({paletteOpen:!s.paletteOpen, paletteQuery:''})); } else if(e.key==='Escape' && this.state.paletteOpen){ this.setState({paletteOpen:false}); } };
  componentWillUnmount(){ window.removeEventListener('keydown', this.paletteHotkey); }

  go = (view) => this.setState({view, toast:null, sidebarOpen:false, ...(view==='workflows'?{wfView:'list', wfNode:null, wfRunning:false, wfActive:null}:{})});
  toggleSidebar = () => this.setState(s=>({sidebarOpen:!s.sidebarOpen}));
  closeSidebar = () => this.setState({sidebarOpen:false});
  openDeal = (id) => { this._uwScroll='top'; this.setState({view:'underwriting', dealId:id, toast:null}); };
  openScrub = (id) => { this._scrubScroll='top'; this.setState({view:'scrubbing', dealId:id, toast:null}); };
  newChat = () => this.setState({view:'chat', chatThread:[], chatInput:'', toast:null, sidebarOpen:false});

  // ===== Submission health =====
  resolveHealth=(id)=>this.setState(s=>({healthResolved:s.healthResolved.includes(id)?s.healthResolved:[...s.healthResolved,id]}));
  toggleHealthExport=()=>this.setState(s=>({healthExportOpen:!s.healthExportOpen}));
  closeHealthExport=()=>this.setState({healthExportOpen:false});
  exportScrubbed=(dest)=>{ this.setState({healthExportOpen:false, toast:'Scrubbed file exported to '+dest}); setTimeout(()=>this.setState({toast:null}),3600); };
  sendToUnderwriter=()=>{ this._convoRun=null; this._scrubScroll='bottom'; this.setState({healthExportOpen:false, scrubTyping:true, scrubTypingLabel:'Underwriting Agent \u00b7 picking up the scrubbed file\u2026', toast:'Sent to Underwriting Agent'}); setTimeout(()=>this.setState({toast:null}),3000); setTimeout(()=>{ this.setState({scrubTyping:false}); this.pushScrub({kind:'agentText',agent:'Underwriting Agent',mono:'Uw',text:'Got the scrubbed file, parsed fields and health summary. Running a first-pass underwrite against Forward Line now \u2014 I\u2019ll post the recommendation and confidence score here in a moment.'}); },1600); };
  manualUnderwrite=()=>{ this._scrubScroll='bottom'; this.setState({healthExportOpen:false, toast:'Manual underwrite \u2014 file assigned to you for review'}); setTimeout(()=>this.setState({toast:null}),3600); this.pushScrub({kind:'agentText',agent:'Scrubbing Agent',mono:'Sc',text:'Underwriting Agent is on Suggest, so I\u2019ve left this for a manual underwrite. The scrubbed file, parsed fields and health summary are attached and ready for your review \u2014 turn the agent to Confirm or Automate anytime to hand this off automatically.'}); };
  openManualReview=()=>this.setState({reviewOpen:true});
  closeReview=()=>this.setState({reviewOpen:false});
  setReviewValue=(e)=>this.setState({reviewValue:e.target.value});
  confirmReview=()=>{
    this.resolveHealth('ocr');
    this.setState({reviewOpen:false, toast:'March deposits verified manually · extraction upgraded to confirmed'});
    this.pushUw({kind:'agentText', confidence:99, text:'Manual review logged — March total deposits confirmed at '+this.state.reviewValue+'. Extraction confidence on that field is now Verified and the figure is locked to the audit trail. Average monthly revenue holds at $148.2k; no change to the recommendation.'});
    setTimeout(()=>this.setState({toast:null}),4200);
  };
  healthExplainNsf=()=>{ this.resolveHealth('nsf'); this.pushUw({kind:'agentText',confidence:84,text:'All three NSFs fall inside March 2026 and clear within the same statement cycle — consistent with a one-off seasonal cash dip, not chronic mismanagement. April and May fully recovered. I weighted it medium, not a disqualifier.'}); };
  healthStacking=()=>{ this.resolveHealth('stack'); this.pushUw({kind:'agentText',confidence:87,text:'Stacking analysis: 2 active positions detected via the deposit-debit pattern — a daily ACH to Forward Line ($318/day) and a weekly to Capital Stack ($1,140/wk). Combined existing debit is ~11% of average daily deposits; adding $60k at 1.32 brings total debit to ~19%, inside Pinnacle\u2019s 25% ceiling.'}); };

  // ===== Command palette =====
  stop=(e)=>{ e.stopPropagation(); };
  openPalette=()=>{ this.setState({paletteOpen:true, paletteQuery:'', sidebarOpen:false}); setTimeout(()=>this.paletteRef.current && this.paletteRef.current.focus(),40); };
  closePalette=()=>this.setState({paletteOpen:false});
  setPaletteQuery=(e)=>this.setState({paletteQuery:e.target.value});
  runAsk=()=>{ const q=this.state.paletteQuery.trim(); if(!q) return; this.setState({paletteOpen:false, paletteQuery:''}); this.routeCommand(q); };
  paletteKey=(e)=>{ if(e.key==='Enter'){ const q=this.state.paletteQuery.trim(); const nav=this.paletteNav(); if(q && nav.length && !this.paletteExactAskOnly()){ /* prefer first nav match when query matches a target */ if(this.paletteQueryMatchesNav()){ nav[0].run(); this.setState({paletteOpen:false,paletteQuery:''}); return; } } if(q){ this.runAsk(); } else if(nav.length){ nav[0].run(); this.setState({paletteOpen:false,paletteQuery:''}); } } };
  paletteGo=(fn)=>{ fn(); this.setState({paletteOpen:false, paletteQuery:''}); };
  paletteExactAskOnly=()=>false;
  paletteQueryMatchesNav=()=>{ const q=this.state.paletteQuery.trim().toLowerCase(); if(!q) return false; return this.paletteNav().some(n=>n.label.toLowerCase().includes(q)); };
  paletteNav=()=>{
    const q=this.state.paletteQuery.trim().toLowerCase();
    const items=[
      {label:'Home', kind:'Screen', tag:'Go', mono:'⌂', run:()=>this.go('home')},
      {label:'Conversations', kind:'Screen', tag:'Go', mono:'●', run:()=>this.go('conversations')},
      {label:'Agents', kind:'Screen', tag:'Go', mono:'◈', run:()=>this.go('agents')},
      {label:'Tasks', kind:'Screen', tag:'Go', mono:'✓', run:()=>this.go('tasks')},
      {label:'Workflows', kind:'Screen', tag:'Go', mono:'↻', run:()=>this.go('workflows')},
      {label:'Knowledge', kind:'Screen', tag:'Go', mono:'▤', run:()=>this.go('knowledge')},
      {label:'Integrations', kind:'Screen', tag:'Go', mono:'✂', run:()=>this.go('integrations')},
    ];
    this.queueData.forEach(d=>items.push({label:d.name, kind:'Deal · '+this.fmtMoney(d.amount), tag:'Open', mono:d.name.slice(0,2), run:()=>this.openDeal(d.id)}));
    this.agents.forEach(a=>items.push({label:a.name+' Agent', kind:'Agent', tag:'Open', mono:a.mono, run:()=>this.openAgentConfig(a.id)}));
    if(!q) return items.slice(0,7).concat(this.queueData.slice(0,2).map(d=>({label:d.name, kind:'Deal · '+this.fmtMoney(d.amount), tag:'Open', mono:d.name.slice(0,2), run:()=>this.openDeal(d.id)})));
    return items.filter(i=>i.label.toLowerCase().includes(q)||i.kind.toLowerCase().includes(q)).slice(0,8);
  };
  pickPersona = (p) => { if(p===this.state.persona) return; const t={marcus:'Now viewing as Marcus \u00b7 broker',diana:'Now viewing as Diana \u00b7 underwriter',talia:'Now viewing as Talia \u00b7 funder'}[p]; this.setState({persona:p, view:'home', toast:t, sidebarOpen:false}); setTimeout(()=>this.setState({toast:null}),2600); };

  // ===== Broker auto-intake pipeline =====
  startIntake=()=>{
    if(this.state.intakeRunning) return;
    this.setState({intakeRunning:true, intakeStep:0, intakeDone:false});
    const total=this.intakeStages.length;
    const tick=(i)=>{
      if(i>=total){ this.setState({intakeRunning:false, intakeDone:true, toast:'Underwritten package sent to 3 funders on WhatsApp Business'}); setTimeout(()=>this.setState({toast:null}),4000); return; }
      this.setState({intakeStep:i+1});
      setTimeout(()=>tick(i+1), 1150);
    };
    setTimeout(()=>tick(0), 500);
  };
  resetIntake=()=>this.setState({intakeStep:0, intakeRunning:false, intakeDone:false});
  goIntake=()=>this.setState({view:'intake', toast:null});

  // ===== Funder fundability — Fund / Deny =====
  openFundability=(id)=>this.setState({view:'fundability', fundDealId:id, fundDecision:null, denyReason:'', denyStep:'choose', toast:null});
  fundDeal=()=>{ this.setState({fundDecision:'funded', toast:'Funded \u00b7 contract generated \u00b7 broker notified on WhatsApp'}); setTimeout(()=>this.setState({toast:null}),4200); };
  startDeny=()=>this.setState({denyStep:'reason'});
  setDenyReason=(r)=>this.setState({denyReason:r});
  confirmDeny=()=>{ if(!this.state.denyReason) return; this.setState({fundDecision:'denied', toast:'Declined \u00b7 reason logged \u00b7 broker notified on WhatsApp'}); setTimeout(()=>this.setState({toast:null}),4200); };
  resetFund=()=>this.setState({fundDecision:null, denyStep:'choose', denyReason:''});

  // ===== Agent configuration + prompt management =====
  openAgentConfig=(id)=>{ if(!this.agentConfig[id]){ const a=this.agents.find(x=>x.id===id)||{}; this.agentConfig[id]={autonomy:a.autonomy||'Suggest',model:'Claude Sonnet 4.6',tools:['EasyMCA core'],prompt:'You are the '+(a.name||'')+' Agent. '+(a.desc||''),guard:[{k:'Require approval before write',v:'On'}]}; } const c=this.agentConfig[id]; this.setState({view:'agentConfig', cfgAgentId:id, cfgDraft:{...c, autonomy:this.autonomyOf(id)}, cfgSaved:false, toast:null}); };
  // Single source of truth for autonomy. Reads: override in state.agentAutonomy, else the agent's config, else its default.
  autonomyOf=(id)=>{ if(this.state.agentAutonomy && this.state.agentAutonomy[id]!==undefined) return this.state.agentAutonomy[id]; if(this.agentConfig[id]) return this.agentConfig[id].autonomy; const a=this.agents.find(x=>x.id===id); return (a&&a.autonomy)||'Suggest'; };
  saveAutonomy=()=>{ try{ localStorage.setItem('easymca_agent_autonomy', JSON.stringify(this.state.agentAutonomy)); }catch(_){} };
  // Change autonomy anywhere (agent config OR workflow inspector) — persists immediately, everything re-reads it.
  setAgentAutonomy=(id,val)=>{ if(this.agentConfig[id]) this.agentConfig[id]={...this.agentConfig[id], autonomy:val}; const a=this.agents.find(x=>x.id===id)||{};
    this.setState(s=>({agentAutonomy:{...s.agentAutonomy,[id]:val}, cfgSaved:true, toast:'Saved \u00b7 '+(a.name||'Agent')+' autonomy set to '+val}), this.saveAutonomy);
    setTimeout(()=>this.setState({toast:null}),2600); };
  setCfgAutonomy=(a)=>{ const id=this.state.cfgAgentId; this.setState(s=>({cfgDraft:{...s.cfgDraft, autonomy:a}})); this.setAgentAutonomy(id, a); };
  setCfgPrompt=(e)=>{ const v=e.target.value; this.setState(s=>({cfgDraft:{...s.cfgDraft, prompt:v}, cfgSaved:false})); };
  saveCfg=()=>{ const id=this.state.cfgAgentId; this.agentConfig[id]={...this.agentConfig[id], ...this.state.cfgDraft}; if(this.state.cfgDraft&&this.state.cfgDraft.autonomy!==undefined){ this.setState(s=>({agentAutonomy:{...s.agentAutonomy,[id]:this.state.cfgDraft.autonomy}}), this.saveAutonomy); } this.setState({cfgSaved:true, toast:'Saved \u00b7 '+(this.agents.find(a=>a.id===id)||{}).name+' Agent configuration updated'}); setTimeout(()=>this.setState({toast:null}),3200); };

  // ===== Auth (demo loop: login / signup / sign out) =====
  authSet=(k)=>(e)=>this.setState({[k]:e.target.value, authError:null});
  authKey=(fn)=>(e)=>{ if(e.key==='Enter') fn(); };
  authSwitch=(scr)=>{ this._authT&&clearTimeout(this._authT); this.setState({authScreen:scr, authStep:'email', authError:null, authNotice:null, authCode:'', authMail:false, authBusy:null}); };
  authBackToEmail=()=>{ this._authT&&clearTimeout(this._authT); this.setState({authStep:'email', authError:null, authMail:false}); };
  authTogglePw=()=>this.setState({authShowPw:!this.state.authShowPw});
  authForgot=()=>this.setState({authNotice:'Password reset link sent to '+(this.state.authEmail||'your email'), authError:null});
  authComplete=(msg)=>{ this._authT&&clearTimeout(this._authT); this.setState({authed:true, persona:'marcus', authBusy:null, authMail:false, authNotice:null, view:'home', toast:msg}); setTimeout(()=>this.setState({toast:null}),4200); };
  authGoogle=()=>{ if(this.state.authBusy) return; this.setState({authBusy:'google', authError:null}); setTimeout(()=>this.authComplete('Signed in with Google \u00b7 welcome back, Marcus'),1100); };
  authLogin=()=>{ if(this.state.authBusy) return; const {authEmail,authPw}=this.state; if(!/^\S+@\S+\.\S+$/.test(authEmail||'')){ this.setState({authError:'Enter a valid work email.'}); return; } if(!(authPw||'').length){ this.setState({authError:'Enter your password.'}); return; } this.setState({authBusy:'login', authError:null, authNotice:null}); setTimeout(()=>this.authComplete('Welcome back, Marcus'),900); };
  authContinueEmail=()=>{ const em=this.state.authEmail2||''; if(!/^\S+@\S+\.\S+$/.test(em)){ this.setState({authError:'Enter a valid work email.'}); return; } this.setState({authStep:'verify', authError:null, authCode:'', authMail:false}); this._authT=setTimeout(()=>this.setState({authMail:true}),1400); };
  authSetCode=(e)=>{ const v=e.target.value.replace(/\D/g,'').slice(0,6); this.setState({authCode:v, authError:null}); };
  authUseCode=()=>this.setState({authCode:'482916', authMail:false, authError:null});
  authResend=()=>{ this._authT&&clearTimeout(this._authT); this.setState({authMail:false}); this._authT=setTimeout(()=>this.setState({authMail:true}),900); };
  authVerify=()=>{ if(this.state.authBusy) return; if((this.state.authCode||'').length!==6){ this.setState({authError:'Enter the 6-digit code from your email.'}); return; } this.setState({authBusy:'verify', authError:null, authMail:false}); setTimeout(()=>this.setState({authBusy:null, authStep:'profile'}),700); };
  authCreate=()=>{ if(this.state.authBusy) return; const {authName,authPw2}=this.state; if(!(authName||'').trim()){ this.setState({authError:'Enter your name.'}); return; } if((authPw2||'').length<8){ this.setState({authError:'Password needs at least 8 characters.'}); return; } this.setState({authBusy:'create', authError:null}); setTimeout(()=>{ this.authComplete('Workspace ready \u2014 welcome to EasyMCA, '+authName.trim().split(' ')[0]); this.setState({onboardOpen:true, freshSignup:true, onboardDone:false, sourcePromptDismissed:false}); },1000); };
  signOut=()=>{ this._authT&&clearTimeout(this._authT); this.setState({authed:false, authScreen:'login', authStep:'email', authBusy:null, authError:null, authNotice:null, authCode:'', authMail:false, paletteOpen:false, view:'home'}); };

  // ===== Add knowledge (intent-first, instant add) =====
  openKAdd=()=>this.setState({kAddOpen:true, kAddError:null, kSource:'file', kLinkInput:'', kStagedDocs:[], kDocAgents:[]});
  kSetSource=(src)=>this.setState({kSource:src, kAddError:null});
  setKLink=(e)=>this.setState({kLinkInput:e.target.value, kAddError:null});
  kAddLink=()=>{ const raw=(this.state.kLinkInput||'').trim(); if(!raw){ this.setState({kAddError:'Paste a link first.'}); return; } let url=raw; if(!/^https?:\/\//i.test(url)) url='https://'+url; let name=url; try{ const u=new URL(url); const seg=u.pathname.split('/').filter(Boolean).pop(); name=seg?decodeURIComponent(seg):u.hostname; }catch(_){ name=raw; } const isDrive=/drive\.google\.com|docs\.google\.com/i.test(url)||this.state.kSource==='drive'; this.setState(s=>({kStagedDocs:[...(s.kStagedDocs||[]), {name:name, size:isDrive?'Drive':'Link', kind:'link', url:url}], kLinkInput:'', kAddError:null})); };
  kBrowseDrive=()=>{ this.setState(s=>({kStagedDocs:[...(s.kStagedDocs||[]), {name:'Underwriting SOP \u2014 Q2 2026.pdf', size:'Drive', kind:'link', url:'https://drive.google.com/file/d/1a2b3c'}], kAddError:null})); };
  closeKAdd=()=>this.setState({kAddOpen:false});
  kIntent=(step)=>this.setState({kAddStep:step, kAddError:null});
  kSetFunderMode=(m)=>this.setState({kFunderMode:m, kAddError:null});
  kSet=(k)=>(e)=>this.setState({[k]:e.target.value, kAddError:null});
  kToggleAgent=(a)=>this.setState(s=>{ const cur=s.kDocAgents||[]; return {kDocAgents:cur.includes(a)?cur.filter(x=>x!==a):[...cur,a]}; });
  kOnRateSheet=(e)=>{ const f=e.target.files&&e.target.files[0]; if(!f) return; e.target.value=''; const funder={name:'Meridian Capital', initial:'M', tier:'Tier 2 \u00b7 B-paper', isNew:true, source:f.name, criteria:[{k:'Max advance',v:'$175k'},{k:'Factor range',v:'1.30 \u2013 1.46'},{k:'Min monthly revenue',v:'$35k'},{k:'Max positions',v:'3'},{k:'Restricted industries',v:'Trucking, Law'},{k:'Most-recent month',v:'Required'}]}; this.setState(s=>({addedFunders:[funder,...(s.addedFunders||[])], kAddOpen:false, toast:'Rate sheet parsed \u00b7 Meridian Capital is live with 6 criteria'})); setTimeout(()=>this.setState({toast:null}),4200); };
  kAddManualFunder=()=>{ const s=this.state; const nm=(s.kfName||'').trim(); if(!nm){ this.setState({kAddError:'Give the program a name.'}); return; } const crit=[]; const add=(k,v)=>{ if((v||'').trim()) crit.push({k, v:v.trim()}); }; add('Max advance',s.kfMax); add('Factor range',s.kfFactor); add('Min monthly revenue',s.kfMinRev); add('Max positions',s.kfPos); const funder={name:nm, initial:nm.charAt(0).toUpperCase(), tier:s.kfTier||'Tier 1 \u00b7 A-paper', isNew:true, criteria:crit.length?crit:[{k:'Criteria',v:'\u2014 add anytime'}]}; this.setState(st=>({addedFunders:[funder,...(st.addedFunders||[])], kAddOpen:false, toast:nm+' is live \u00b7 Scrubbing & Funder Intelligence can match against it now'})); setTimeout(()=>this.setState({toast:null}),4200); };
  kOnDocs=(e)=>{ const fs=Array.prototype.slice.call(e.target.files||[]); if(!fs.length) return; e.target.value=''; const staged=fs.map(f=>({name:f.name, kind:'file', size:f.size?(f.size>1048576?(f.size/1048576).toFixed(1)+' MB':Math.max(1,Math.round(f.size/1024))+' KB'):'\u2014'})); this.setState(s=>({kStagedDocs:[...(s.kStagedDocs||[]), ...staged]})); };
  kRemoveStaged=(i)=>this.setState(s=>({kStagedDocs:(s.kStagedDocs||[]).filter((_,x)=>x!==i)}));
  kAddDocs=()=>{ const s=this.state; const staged=s.kStagedDocs||[]; if(!staged.length){ this.setState({kAddError:'Add at least one file or link.'}); return; } const ag=['Platform agent', ...((s.kDocAgents||[]))]; const docs=staged.map(f=>({name:f.name, ext:(f.kind==='link'?'LINK':(f.name.indexOf('.')>-1?f.name.split('.').pop():'doc').toUpperCase().slice(0,4)), size:f.size, meta:'Added just now \u00b7 you', agents:ag, isNew:true, isLink:f.kind==='link'})); this.setState(st=>({addedDocs:[...docs, ...(st.addedDocs||[])], kAddOpen:false, toast:docs.length+' item'+(docs.length===1?'':'s')+' live \u00b7 platform agent can cite '+(docs.length===1?'it':'them')+' immediately'})); setTimeout(()=>this.setState({toast:null}),4200); };

  buildWf=()=>{
    const s=this.state, id=s.wfId, g=this.workflowGraphs[id]; if(!g) return null;
    const wmeta=this.workflows.find(w=>w.id===id)||{};
    const status=this.wfStatusOf(id);
    const added=(s.wfAdded[id]||[]);
    const autoOf=(nid,def)=>s.wfAuto[nid]!==undefined?s.wfAuto[nid]:def;
    const agentIdByName=(nm)=>{ const a=this.agents.find(x=>x.name===nm); return a?a.id:null; };
    const condOf=(nid,def)=>s.wfCond[nid]!==undefined?s.wfCond[nid]:def;
    const X=64, W=248, GAP=52, BX=64+248+92, BW=208;
    const H={trigger:76, agent:112, action:96, decision:96, human:96, delay:96};
    // ordered spine: trigger, base spine, added, end
    const spineNodes=[
      {id:'trigger', kind:'trigger', label:g.trigger.label, source:g.trigger.source},
      ...g.spine.map(n=>({...n, kind:n.kind||'agent'})),
      ...added,
      {...g.end, kind:g.end.kind||'action'},
    ];
    let y=26; const laid=[]; const yH={};
    spineNodes.forEach(n=>{ const h=H[n.kind]||H.agent; const node={...n, x:X, y, w:W, h}; yH[n.id]={y,h}; laid.push(node); y+=h+GAP; });
    const canvasH=y+10;
    // branches to the right, aligned to their source
    const branchNodes=g.branches.filter(b=>yH[b.from]).map(b=>{ const src=yH[b.from]; const h=H.decision; const by=src.y + (src.h-h)/2; return {...b, kind:'branch', x:BX, y:by, w:BW, h}; });
    const canvasW=BX+BW+70;
    // active/done
    const activeId=s.wfActive, doneSet=s.wfDone||[];
    const selId=s.wfNode;
    const glyphKind=(k)=>k==='agent';
    const nodeVM=(n, isBranch)=>{
      const nid=id+':'+n.id;
      const sel=selId===nid, running=activeId===nid, done=doneSet.includes(nid);
      let border='1px solid var(--border)', shadow='var(--shadow)';
      if(isBranch){ border='1.5px dashed var(--border2)'; shadow='none'; }
      if(done){ border='1.5px solid var(--ok)'; shadow='0 4px 14px rgba(24,133,68,.14)'; }
      if(running){ border='1.5px solid var(--accent)'; shadow='0 0 0 4px var(--accent-bg),0 10px 26px rgba(80,70,160,.2)'; }
      if(sel){ border='1.5px solid var(--accent)'; shadow='0 0 0 3px var(--accent-bg),var(--shadow-lg)'; }
      const bg=isBranch?'var(--surface2)':'var(--surface)';
      const style='position:absolute;left:'+n.x+'px;top:'+n.y+'px;width:'+n.w+'px;height:'+n.h+'px;box-sizing:border-box;background:'+bg+';border:'+border+';border-radius:14px;padding:'+(isBranch?'12px 14px':'13px 15px')+';box-shadow:'+shadow+';cursor:pointer;display:flex;flex-direction:column;transition:box-shadow .18s,border-color .18s';
      const nodeAid=(n.agent&&!isBranch)?agentIdByName(n.agent):null;
      const auto=n.kind==='trigger'?null:(nodeAid?this.autonomyOf(nodeAid):autoOf(nid, n.auto));
      const cond=condOf(nid, n.cond);
      const topTag={trigger:'Trigger',agent:'Agent',action:'Action',decision:'Condition',human:'Approval',delay:'Delay'}[n.kind]||(isBranch?'Branch':'Step');
      const titleText=n.kind==='trigger'?(n.source||'Trigger'):(isBranch?n.label:(n.agent||n.label));
      const bodyText=isBranch?(n.desc||''):n.label;
      return {
        nid, style, onClick:()=>this.selectWfNode(nid),
        isTrigger:n.kind==='trigger', isAgent:n.kind==='agent', isAction:n.kind==='action', isBranch:!!isBranch,
        isDecision:n.kind==='decision', isHuman:n.kind==='human', isDelay:n.kind==='delay',
        mono:n.mono||'', topTag, titleText, bodyText,
        auto:auto||'', hasAuto:!!auto, autoStyle:auto?this.autoStyle(auto):'',
        cond:cond||'', hasCond:!!cond && !isBranch,
        when:n.when||'', done, running, showDone:done&&!running,
        badgeStyle:'width:34px;height:34px;border-radius:9px;flex:none;display:flex;align-items:center;justify-content:center;font:600 11px var(--mono);'+(n.kind==='agent'?'background:#17171a;color:#fff':n.kind==='trigger'?'background:var(--accent-bg);color:var(--accent)':isBranch?'background:#fff;color:var(--warn);border:1px solid var(--border2)':'background:var(--accent);color:#fff'),
        needsMonoGlyph:(n.kind==='decision'||n.kind==='human'||n.kind==='delay'),
      };
    };
    const nodes=laid.map(n=>nodeVM(n,false));
    const branches=branchNodes.map(n=>nodeVM(n,true));
    // edges
    const edges=[]; const EC='#c6cddb';
    for(let i=0;i<laid.length-1;i++){ const a=laid[i], b=laid[i+1];
      const sx=a.x+a.w/2, sy=a.y+a.h, tx=b.x+b.w/2, ty=b.y;
      const aDone=doneSet.includes(id+':'+a.id), bDone=doneSet.includes(id+':'+b.id)||activeId===id+':'+b.id;
      const col=(aDone&&bDone)?'var(--ok)':EC;
      edges.push({d:'M'+sx+' '+sy+' C '+sx+' '+(sy+34)+', '+tx+' '+(ty-34)+', '+tx+' '+ty, col, w:(aDone&&bDone)?'2.4':'1.8'});
    }
    branchNodes.forEach(b=>{ const src=yH[b.from]; const sx=X+W, sy=src.y+src.h/2, tx=b.x, ty=b.y+b.h/2;
      edges.push({d:'M'+sx+' '+sy+' C '+(sx+56)+' '+sy+', '+(tx-56)+' '+ty+', '+tx+' '+ty, col:'#d8b98a', w:'1.6', dashed:true});
      // branch label position
      b._lx=(sx+tx)/2 - 34; b._ly=(sy+ty)/2 - 26;
    });
    const branchLabels=branchNodes.map(b=>({text:b.when, style:'position:absolute;left:'+b._lx+'px;top:'+b._ly+'px;font:600 10px var(--mono);color:var(--warn);background:var(--warn-bg);padding:2px 8px;border-radius:999px;white-space:nowrap;pointer-events:none'}));
    // inspector for selected node
    let insp=null;
    if(selId){
      const all=[...laid, ...branchNodes]; const node=all.find(n=>id+':'+n.id===selId);
      if(node){
        const nid=selId; const isBranch=branchNodes.indexOf(node)>-1;
        const inspAid=(node.agent&&!isBranch)?agentIdByName(node.agent):null;
        const auto=node.kind==='trigger'?null:(inspAid?this.autonomyOf(inspAid):autoOf(nid,node.auto));
        const kindLabel={trigger:'Trigger',agent:'Agent step',action:'Action',branch:'Conditional branch',decision:'Condition',human:'Human approval',delay:'Delay'}[node.kind]||'Step';
        const isAdded=/^add-/.test(node.id);
        insp={
          nid, title:node.agent||node.label, kindLabel,
          isTrigger:node.kind==='trigger', isBranch, isAgent:node.kind==='agent',
          desc:node.label, source:node.source||'', when:node.when||'',
          model:node.model||'', hasModel:!!node.model,
          auto:auto||'', hasAuto:!!auto,
          autoSynced:!!inspAid,
          autoOpts:['Automate','Confirm','Suggest'].map(a=>({name:a, onClick:()=> inspAid?this.setAgentAutonomy(inspAid,a):this.setWfAuto(nid,a),
            style:'flex:1;border:none;background:'+(auto===a?'var(--surface)':'transparent')+';color:'+(auto===a?'var(--text)':'var(--text2)')+';padding:6px 8px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;box-shadow:'+(auto===a?'0 1px 2px rgba(16,15,13,.1),0 0 0 1px var(--border)':'none')})),
          hasModel:!!node.model,
          hasCond:!!(condOf(nid, node.cond)) && !isBranch && node.kind!=='trigger',
          cond:condOf(nid, node.cond)||'', setCond:(e)=>this.setWfCond(nid,e),
          agentId:inspAid,
          openAgentCfg:()=>{ const a=this.agents.find(x=>x.name===node.agent); if(a) this.openAgentConfig(a.id); },
          canRemove:isAdded, remove:()=>this.removeWfStep(node.id),
        };
      }
    }
    const paletteItems=this.wfPalette.map(p=>({...p, onClick:()=>this.addWfStep(p.kind)}));
    return {
      wfName:wmeta.name, wfTrigger:g.trigger.label, wfStatus:status, wfIsActive:status==='Active',
      wfStatusStyle:status==='Active'?'display:inline-flex;align-items:center;gap:6px;font:500 11.5px var(--sans);color:var(--ok);background:var(--ok-bg);padding:3px 10px;border-radius:999px':'display:inline-flex;align-items:center;gap:6px;font:500 11.5px var(--sans);color:var(--text2);background:var(--surface2);padding:3px 10px;border-radius:999px',
      wfStatusToggleLabel:status==='Active'?'Pause':'Activate',
      wfNodes:nodes, wfBranches:branches, wfEdges:edges, wfBranchLabels:branchLabels,
      wfCanvasW:canvasW, wfCanvasH:canvasH,
      wfInnerStyle:'position:relative;width:'+canvasW+'px;height:'+canvasH+'px;transform:scale('+s.wfZoom+');transform-origin:top left',
      wfSvgStyle:'position:absolute;left:0;top:0;width:'+canvasW+'px;height:'+canvasH+'px;overflow:visible;pointer-events:none',
      wfZoomLabel:Math.round(s.wfZoom*100)+'%',
      wfInspector:insp, wfHasInspector:!!insp,
      wfPaletteItems:paletteItems, wfPaletteOpen:s.wfPaletteOpen,
      wfRunning:s.wfRunning, wfNotRunning:!s.wfRunning, wfRunLabel:s.wfRunning?'Running\u2026':'Test run',
      wfStatsRuns:g.stats.runs, wfStatsAuto:g.stats.auto, wfStatsAvg:g.stats.avg,
    };
  };

  // ===== Workflow gallery view-model =====
  goWorkflowDetail=()=>this.setState({view:'workflows', wfView:'list', wfNode:null, toast:null});
  openWorkflow=(id)=>{ this._wfRun&&clearTimeout(this._wfRun); this.setState({view:'workflows', wfView:'canvas', wfId:id, wfNode:null, wfZoom:1, wfRunning:false, wfActive:null, wfDone:[], toast:null}); };
  backToWorkflows=()=>{ this._wfRun&&clearTimeout(this._wfRun); this.setState({wfView:'list', wfNode:null, wfRunning:false, wfActive:null, wfDone:[]}); };
  newWorkflow=()=>{ this.setState({toast:'Start from a template or duplicate an existing workflow to build your own'}); setTimeout(()=>this.setState({toast:null}),3200); };
  selectWfNode=(nid)=>this.setState({wfNode:nid});
  clearWfNode=()=>this.setState({wfNode:null});
  setWfAuto=(nid,val)=>this.setState(s=>({wfAuto:{...s.wfAuto,[nid]:val}, toast:'Autonomy updated \u00b7 saved to this workflow'}), ()=>{ setTimeout(()=>this.setState({toast:null}),2400); });
  setWfCond=(nid,e)=>{ const v=e.target.value; this.setState(s=>({wfCond:{...s.wfCond,[nid]:v}})); };
  wfZoomIn=()=>this.setState(s=>({wfZoom:Math.min(1.3, Math.round((s.wfZoom+0.1)*10)/10)}));
  wfZoomOut=()=>this.setState(s=>({wfZoom:Math.max(0.6, Math.round((s.wfZoom-0.1)*10)/10)}));
  wfZoomReset=()=>this.setState({wfZoom:1});
  toggleWfStatus=()=>{ const id=this.state.wfId; const cur=this.wfStatusOf(id); const next=cur==='Active'?'Paused':'Active'; this.setState(s=>({wfStatus:{...s.wfStatus,[id]:next}, toast:'Workflow '+(next==='Active'?'activated':'paused')})); setTimeout(()=>this.setState({toast:null}),2600); };
  wfStatusOf=(id)=>{ if(this.state.wfStatus[id]) return this.state.wfStatus[id]; const w=this.workflows.find(x=>x.id===id); return w?w.status:'Active'; };
  wfTogglePalette=()=>this.setState(s=>({wfPaletteOpen:!s.wfPaletteOpen}));
  addWfStep=(kind)=>{ const id=this.state.wfId; if(!id) return; const seq=(this.state.wfAdded[id]||[]).length+1;
    const defs={ agent:{mono:'Ad',agent:'Advisory',label:'Review and advise on the deal',auto:'Suggest',cond:'On request',model:'Claude Sonnet 4.6',kind:'agent'},
      decision:{mono:'?',agent:'Condition',label:'Branch on a rule you define',auto:'Automate',cond:'Define a rule',kind:'decision'},
      human:{mono:'\u2713',agent:'Human approval',label:'Wait for a person to confirm',auto:'Confirm',cond:'Requires sign-off',kind:'human'},
      action:{mono:'\u2192',agent:'Action',label:'Write, send, or route an output',auto:'Automate',cond:'Always',kind:'action'},
      delay:{mono:'\u23f1',agent:'Delay',label:'Hold for a time or an event',auto:'Automate',cond:'Wait',kind:'delay'} };
    const base=defs[kind]||defs.agent; const nid='add-'+kind+'-'+seq;
    const node={...base, id:nid};
    this.setState(s=>({wfAdded:{...s.wfAdded,[id]:[...(s.wfAdded[id]||[]),node]}, wfNode:id+':'+nid, toast:base.agent+' step added \u2014 configure it on the right'}));
    setTimeout(()=>this.setState({toast:null}),2800);
  };
  removeWfStep=(localId)=>{ const id=this.state.wfId; this.setState(s=>({wfAdded:{...s.wfAdded,[id]:(s.wfAdded[id]||[]).filter(n=>n.id!==localId)}, wfNode:null, toast:'Step removed'})); setTimeout(()=>this.setState({toast:null}),2200); };
  runWorkflow=()=>{
    if(this.state.wfRunning) return; const id=this.state.wfId; const g=this.workflowGraphs[id]; if(!g) return;
    const order=['trigger', ...g.spine.map(x=>x.id), ...((this.state.wfAdded[id]||[]).map(x=>x.id)), 'end'];
    this.setState({wfRunning:true, wfDone:[], wfActive:id+':'+order[0], wfNode:null});
    const tick=(i)=>{
      if(i>=order.length){ this._wfRun=setTimeout(()=>{ this.setState({wfRunning:false, wfActive:null, toast:'Test run complete \u00b7 all steps passed'}); setTimeout(()=>this.setState({toast:null}),3200); },520); return; }
      this.setState(s=>({wfActive:id+':'+order[i], wfDone:i>0?[...s.wfDone, id+':'+order[i-1]]:s.wfDone}));
      this._wfRun=setTimeout(()=>tick(i+1), 620);
    };
    this._wfRun=setTimeout(()=>tick(1), 620);
  };


  // Diana \u2014 factor adjustment
  adjFactor=(delta)=>{
    const base=this.recFor(this.state.scenario).factor;
    const next=Math.max(-0.10, Math.min(0.10, +(this.state.factorAdj+delta).toFixed(2)));
    this.setState({factorAdj:next});
  };
  resetFactor=()=>this.setState({factorAdj:0});

  // Marcus \u2014 scrubbing
  setScrubInput=(e)=>this.setState({scrubInput:e.target.value});
  scrubKey=(e)=>{ if(e.key==='Enter') this.sendScrub(); };
  attachScrub=()=>this.scrubFileRef.current && this.scrubFileRef.current.click();
  onScrubFiles=(e)=>{ const names=[...(e.target.files||[])].map(f=>f.name); if(names.length) this.setState(s=>({scrubFiles:[...s.scrubFiles,...names]})); e.target.value=''; };
  removeScrubFile=(i)=>this.setState(s=>({scrubFiles:s.scrubFiles.filter((_,j)=>j!==i)}));
  sendScrub=()=>{ const t=this.state.scrubInput.trim(); const f=(this.state.scrubFiles||[]).slice(); if(!t && !f.length) return;
    if(!t && f.length){ this.setState({scrubFiles:[]}); this.pushScrub({kind:'user',text:'Here '+(f.length>1?'are':'is')+' '+f.length+' document'+(f.length>1?'s':'')+' \u2014 '+f.join(', ')});
      this.setState({scrubTyping:true, scrubTypingLabel:'Scrubbing Agent is parsing the upload\u2026'});
      setTimeout(()=>{ this.setState({scrubTyping:false}); this.pushScrub({kind:'agentText',agent:'Scrubbing Agent',mono:'Sc',text:'Received '+f.length+' document'+(f.length>1?'s':'')+'. Parsing and folding '+(f.length>1?'them':'it')+' into the scrub against the target funder\u2019s criteria \u2014 I\u2019ll flag anything that affects fit.'}); },1200);
      return; }
    const suffix=f.length?(' \u00b7 '+f.length+' file'+(f.length>1?'s':'')+' attached'):''; this.setState({scrubInput:'', scrubFiles:[]}); this.askScrub(t+suffix); };
  pushScrub=(b)=>{ this._scrubScroll='bottom'; this.setState(s=>({scrubThread:[...s.scrubThread,b]})); };
  askScrub(text){
    this.pushScrub({kind:'user',text});
    const low=text.toLowerCase();
    this.setState({scrubTyping:true,scrubTypingLabel:'Scrubbing Agent is checking against Forward Line\u2026'});
    const run=(fn,ms)=>setTimeout(()=>{ this.setState({scrubTyping:false}); fn(); }, ms||1200);
    if(low.includes('scrub')||low.includes('forward')||low.includes('check')){ run(()=>this.runScrubbing()); return; }
    if(low.includes('request')||low.includes('june')||low.includes('whatsapp')||low.includes('chase')){ run(()=>this.handoffInfo()); return; }
    if(low.includes('override')){ run(()=>this.pushScrub({kind:'agentText',agent:'Scrubbing Agent',mono:'Sc',text:'Understood \u2014 to override the missing-statement flag I need a written justification (e.g. "merchant submitted June via secure portal directly to Forward Line"). I\u2019ll log it against this deal in HubSpot with your override.'})); return; }
    if(low.includes('mark')||low.includes('done')||low.includes('approve')){ run(()=>this.markScrubbed()); return; }
    if(low.includes('explain')||low.includes('why')||low.includes('flag')){ run(()=>this.pushScrub({kind:'agentText',agent:'Scrubbing Agent',mono:'Sc',text:'Forward Line\u2019s underwriting model weighs the most-recent month heavily for trend confirmation. Without June we can\u2019t prove the April recovery held, which is the strongest argument for the deal. Hand it off and I\u2019ll have it back from the merchant in under an hour.'})); return; }
    run(()=>this.pushScrub({kind:'agentText',agent:'Scrubbing Agent',mono:'Sc',text:'I can run a full scrub, hand the missing statement off to Information Collection, explain a flag, or mark this deal scrubbed once you\u2019re ready. What would help?'}));
  }
  runScrubbing(){
    this.pushScrub({kind:'scrubcardM'});
  }
  handoffInfo=()=>{
    this.setState({scrubTyping:true,scrubTypingLabel:'Information Collection Agent is drafting a WhatsApp\u2026'});
    setTimeout(()=>{ this.setState({scrubTyping:false,toast:'WhatsApp sent to Cinnamon Trail \u00b7 Information Collection is tracking the request'});
      this.pushScrub({kind:'agentText',agent:'Information Collection Agent',mono:'Ic',text:'Sent. Message to Pat (owner) on WhatsApp: \u201cHey \u2014 Marcus needs your June statement to wrap up Forward Line. A photo of each page works. I\u2019ll let you know when it\u2019s in.\u201d I\u2019ll ping back the moment it arrives.'});
      setTimeout(()=>this.setState({toast:null}),3800);
    },1300);
  };
  markScrubbed=()=>{
    this.pushScrub({kind:'scrubDecision', funder:'Forward Line', score:88, ref:'HS-9417'});
    this.setState({scrubDecided:true, toast:'Scrubbed against Forward Line \u00b7 written to HubSpot deal HS-9417'});
    setTimeout(()=>this.setState({toast:null}),4500);
  };
  overrideFlag=()=>{ this.askScrub('Override the missing-statement flag'); };
  scrubAction=(action)=>{ if(action==='request') this.handoffInfo(); else if(action==='mark') this.markScrubbed(); else if(action==='override') this.overrideFlag(); };

  // ===== Scrub variant switcher + feedback + popups + health (Marcus) =====
  setScrubVariant=(v)=>{ if(v===this.state.scrubVariant) return; this._convoRun=null; this._scrubScroll='top'; this.setState({scrubVariant:v, scrubThread:this.scrubSeed(v), scrubDecided:false, scrubFeedback:{}, scrubHealthResolved:[], scrubPopup:null, scrubOcrResolved:false, retargetIndustry:null, srcEdits:{}, srcExpanded:[], srcPanel:null, srcPanelField:null}); };
  setScrubFeedback=(id,val)=>this.setState(s=>({scrubFeedback:{...s.scrubFeedback, [id]: s.scrubFeedback[id]===val?null:val}, toast: val==='up'?'Thanks — feedback logged to improve the Scrubbing Agent':'Flagged for review — the team will check this step'}), ()=>{ setTimeout(()=>this.setState({toast:null}),2600); });
  openScrubPopup=(p)=>this.setState({scrubPopup:p});
  closeScrubPopup=()=>this.setState({scrubPopup:null});
  // Sources & Edit inspector drawer
  openSrcPanel=(stepKey, firstField)=>this.setState({srcPanel:stepKey, srcPanelField:firstField});
  closeSrcPanel=()=>this.setState({srcPanel:null});
  selectSrcField=(id)=>this.setState({srcPanelField:id});
  startSrcResize=(e)=>{ e.preventDefault(); const onMove=(ev)=>{ const cx=ev.touches?ev.touches[0].clientX:ev.clientX; const panel=document.getElementById('srcPanelBody'); if(!panel) return; const r=panel.getBoundingClientRect(); let frac=(cx-r.left)/r.width; frac=Math.max(0.32,Math.min(0.72,frac)); this.setState({srcSplit:frac}); }; const onUp=()=>{ window.removeEventListener('mousemove',onMove); window.removeEventListener('mouseup',onUp); window.removeEventListener('touchmove',onMove); window.removeEventListener('touchend',onUp); }; window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp); window.addEventListener('touchmove',onMove,{passive:false}); window.addEventListener('touchend',onUp); };
  resolveScrubHealth=(id)=>this.setState(s=>({scrubHealthResolved:s.scrubHealthResolved.includes(id)?s.scrubHealthResolved:[...s.scrubHealthResolved,id]}));
  openForgedReview=()=>this.setState({forgedReviewOpen:true});
  closeForgedReview=()=>this.setState({forgedReviewOpen:false});
  confirmForgedReview=()=>{ this.resolveScrubHealth('forged'); this.setState({forgedReviewOpen:false, toast:'Statements flagged as unverified \u00b7 logged to deal record'}); this.pushScrub({kind:'agentText',agent:'Scrubbing Agent',mono:'Sc',text:'Logged \u2014 the March and April statements are marked unverified pending source re-pull from the bank\u2019s portal. Until they\u2019re re-verified, this deal can\u2019t go to any funder. I\u2019ve noted the DataMerch forgery report against the merchant record.'}); setTimeout(()=>this.setState({toast:null}),4200); };
  scrubHealthReassign=()=>{ this.resolveScrubHealth('floor'); this.pushScrub({kind:'agentText',agent:'Funder Intelligence Agent',mono:'Fn',text:'Trucking with $142k/mo lands below the A-paper floor but fits two B/C-paper programs: Bedrock Funding (min $25k/mo, accepts trucking) and Capital Stack (min $30k/mo). Both take a resolution letter for a prior default. Want me to re-target this deal to Bedrock and re-run the scrub?'}); };
  scrubHealthResolution=()=>{ this.resolveScrubHealth('default'); this.openScrubPopup('resolution'); };
  scrubHealthRequestJune=()=>{ this.resolveScrubHealth('recency'); this.handoffInfo(); };
  // ---- Intake confirm task: pick documents from a Gmail thread ----
  gmailThreads=[
    {id:'pat', from:'Pat Ortega', biz:'Cinnamon Trail Coffee', subject:'Funding docs \u2014 Cinnamon Trail Coffee LLC', snippet:'Attached the application and the statements you asked for \u2014 let me know if anything else is needed before Friday.', when:'Jun 21', unread:true, count:6, docs:[
      {id:'d1', name:'MCA_Application_signed.pdf', kind:'Application', size:'1.2 MB', date:'2026-06-21', dateLabel:'Jun 21, 2026'},
      {id:'d2', name:'BofA_stmt_May_2026.pdf', kind:'Bank statement', size:'3.4 MB', date:'2026-06-21', dateLabel:'Jun 21, 2026'},
      {id:'d3', name:'BofA_stmt_Apr_2026.pdf', kind:'Bank statement', size:'3.1 MB', date:'2026-06-18', dateLabel:'Jun 18, 2026'},
      {id:'d4', name:'BofA_stmt_Mar_2026.pdf', kind:'Bank statement', size:'2.9 MB', date:'2026-06-18', dateLabel:'Jun 18, 2026'},
      {id:'d5', name:'voided_check.jpg', kind:'Voided check', size:'480 KB', date:'2026-06-15', dateLabel:'Jun 15, 2026'},
      {id:'d6', name:'drivers_license_front.jpg', kind:'Owner ID', size:'610 KB', date:'2026-06-15', dateLabel:'Jun 15, 2026'},
    ]},
    {id:'sofia', from:'Sofia Reyes', biz:'Sofia\u2019s Bakery', subject:'Re: statements for the $32k request', snippet:'Here are Feb\u2013Apr. The May statement comes Friday when the bank posts it.', when:'Jun 20', unread:false, count:3, docs:[
      {id:'s1', name:'Chase_stmt_Apr_2026.pdf', kind:'Bank statement', size:'2.2 MB', date:'2026-06-20', dateLabel:'Jun 20, 2026'},
      {id:'s2', name:'Chase_stmt_Mar_2026.pdf', kind:'Bank statement', size:'2.4 MB', date:'2026-06-20', dateLabel:'Jun 20, 2026'},
      {id:'s3', name:'Chase_stmt_Feb_2026.pdf', kind:'Bank statement', size:'2.1 MB', date:'2026-06-20', dateLabel:'Jun 20, 2026'},
    ]},
    {id:'ray', from:'Raymond Cole', biz:'Lone Star Freight', subject:'Bank statements for resubmission \u2014 Lone Star Freight LLC', snippet:'All six statements attached (Dec through May) plus everything Velocity sent over. Let me know what Forward Line says.', when:'Jun 21', unread:true, count:6, docs:[
      {id:'r1', name:'Frontier_stmt_May_2026.pdf', kind:'Bank statement', size:'3.6 MB', date:'2026-06-21', dateLabel:'Jun 21, 2026'},
      {id:'r2', name:'Frontier_stmt_Apr_2026.pdf', kind:'Bank statement', size:'3.3 MB', date:'2026-06-21', dateLabel:'Jun 21, 2026'},
      {id:'r3', name:'Frontier_stmt_Mar_2026.pdf', kind:'Bank statement', size:'3.1 MB', date:'2026-06-18', dateLabel:'Jun 18, 2026'},
      {id:'r4', name:'Frontier_stmt_Feb_2026.pdf', kind:'Bank statement', size:'3.0 MB', date:'2026-06-18', dateLabel:'Jun 18, 2026'},
      {id:'r5', name:'Frontier_stmt_Jan_2026.pdf', kind:'Bank statement', size:'2.8 MB', date:'2026-06-15', dateLabel:'Jun 15, 2026'},
      {id:'r6', name:'Frontier_stmt_Dec_2025.pdf', kind:'Bank statement', size:'2.7 MB', date:'2026-06-15', dateLabel:'Jun 15, 2026'},
    ]},
    {id:'devon', from:'Devon Pierce', biz:'Harborlight Print', subject:'Working capital application + statements', snippet:'Signed app and the last four months are attached. Happy to send the May one once it posts next week.', when:'Jun 19', unread:false, count:5, docs:[
      {id:'v1', name:'Application_Harborlight.pdf', kind:'Application', size:'1.1 MB', date:'2026-06-19', dateLabel:'Jun 19, 2026'},
      {id:'v2', name:'WellsFargo_Apr_2026.pdf', kind:'Bank statement', size:'2.6 MB', date:'2026-06-19', dateLabel:'Jun 19, 2026'},
      {id:'v3', name:'WellsFargo_Mar_2026.pdf', kind:'Bank statement', size:'2.5 MB', date:'2026-06-19', dateLabel:'Jun 19, 2026'},
      {id:'v4', name:'WellsFargo_Feb_2026.pdf', kind:'Bank statement', size:'2.4 MB', date:'2026-06-17', dateLabel:'Jun 17, 2026'},
      {id:'v5', name:'WellsFargo_Jan_2026.pdf', kind:'Bank statement', size:'2.3 MB', date:'2026-06-17', dateLabel:'Jun 17, 2026'},
    ]},
    {id:'mara', from:'Mara Lin', biz:'Lumen Yoga Studio', subject:'Re: docs for the $32k renewal', snippet:'Voided check plus Feb through April. Let me know if you need the studio lease too.', when:'Jun 18', unread:false, count:4, docs:[
      {id:'m1', name:'voided_check_lumen.jpg', kind:'Voided check', size:'520 KB', date:'2026-06-18', dateLabel:'Jun 18, 2026'},
      {id:'m2', name:'Chase_Apr_2026.pdf', kind:'Bank statement', size:'2.0 MB', date:'2026-06-18', dateLabel:'Jun 18, 2026'},
      {id:'m3', name:'Chase_Mar_2026.pdf', kind:'Bank statement', size:'2.1 MB', date:'2026-06-18', dateLabel:'Jun 18, 2026'},
      {id:'m4', name:'Chase_Feb_2026.pdf', kind:'Bank statement', size:'1.9 MB', date:'2026-06-16', dateLabel:'Jun 16, 2026'},
    ]},
    {id:'glenn', from:'Glenn Alvarez', biz:'Orchard Hardware', subject:'Statements for the equipment advance', snippet:'Attaching the three months you asked for. The application is on the way from my accountant.', when:'Jun 17', unread:true, count:3, docs:[
      {id:'g1', name:'PNC_Apr_2026.pdf', kind:'Bank statement', size:'2.8 MB', date:'2026-06-17', dateLabel:'Jun 17, 2026'},
      {id:'g2', name:'PNC_Mar_2026.pdf', kind:'Bank statement', size:'2.7 MB', date:'2026-06-17', dateLabel:'Jun 17, 2026'},
      {id:'g3', name:'PNC_Feb_2026.pdf', kind:'Bank statement', size:'2.6 MB', date:'2026-06-15', dateLabel:'Jun 15, 2026'},
    ]},
  ];
  openIntakeTask=()=>{
    // Conversation Intake honors its saved autonomy: Automate → auto-ingest everything, no manual pick.
    if(this.autonomyOf('conversationintake')==='Automate'){ this.autoIntakeRun(); return; }
    this.setState({intakeTaskOpen:true, intakeTaskStep:'threads', intakeQuery:''});
  };
  autoIntakeRun=()=>{
    const th=this.gmailThreads.find(t=>t.id==='ray')||this.gmailThreads[0];
    const n=th?th.docs.length:6;
    this._scrubScroll='bottom';
    this.setState({intakeTaskOpen:false, intakeTaskDone:true,
      view:'scrubbing', scrubVariant:'flagged', scrubThread:[], scrubDecided:false, scrubFeedback:{}, scrubHealthResolved:[],
      scrubPopup:null, scrubOcrResolved:false, retargetIndustry:null, srcEdits:{}, srcExpanded:[], srcPanel:null, srcPanelField:null,
      toast:'Auto-intake on \u00b7 Conversation Intake ingested '+n+' documents from '+(th?th.from:'Gmail')+' \u2014 running the scrub'}, this.playIntakeConvo);
    setTimeout(()=>this.setState({toast:null}),4200);
  };
  closeIntakeTask=()=>this.setState({intakeTaskOpen:false});
  // ===== Header notifications =====
  toggleNotifs=()=>this.setState(s=>({notifOpen:!s.notifOpen}));
  closeNotifs=()=>this.setState({notifOpen:false});
  markAllNotifsRead=()=>this.setState(s=>({notifs:(s.notifs||[]).map(n=>({...n,read:true}))}));
  raiseIntakeNotif=()=>this.setState(s=>{ const ex=(s.notifs||[]); if(ex.some(n=>n.id==='intake-gmail')){ return {notifs:ex.map(n=>n.id==='intake-gmail'?{...n,read:false,time:'Just now'}:n)}; } return {notifs:[{id:'intake-gmail',mono:'Ci',tone:'warn',title:'Confirmation required \u2014 documents to intake',sub:'Lone Star Freight \u00b7 6 attachments found in Gmail',time:'Just now',read:false,cta:'intake'},...ex]}; });
  runNotifCta=(cta)=>{ this.setState({notifOpen:false, toast:null, toastCta:null}); if(cta==='intake') this.openIntakeTask(); else if(cta==='scrub-cinnamon') this.openScrub('cinnamon'); else if(cta==='renewals') this.go('renewals'); };
  clickNotif=(id,cta)=>{ this.setState(s=>({notifs:(s.notifs||[]).map(n=>n.id===id?{...n,read:true}:n)})); this.runNotifCta(cta); };
  // Manual scrub: hand off the selected docs but let the broker drive the conversation.
  confirmIntakeManual=()=>{
    const n=this.state.intakeDocsSel.length; if(!n) return;
    const th=this.gmailThreads.find(t=>t.id===this.state.intakeThreadId);
    this._convoRun=null; this._scrubScroll='bottom';
    this.setState({intakeTaskOpen:false, intakeTaskDone:true,
      view:'scrubbing', scrubVariant:'flagged', scrubDecided:false, scrubFeedback:{}, scrubHealthResolved:[],
      scrubPopup:null, scrubOcrResolved:false, retargetIndustry:null, srcEdits:{}, srcExpanded:[], srcPanel:null, srcPanelField:null, scrubTyping:false,
      scrubThread:[
        {kind:'agentText',agent:'Document Parsing Agent',mono:'Dp',text:'Received '+n+' document'+(n===1?'':'s')+' from '+(th?th.from:'Gmail')+'. Parsed and ready \u2014 nothing has been scrubbed yet.'},
        {kind:'agentText',agent:'Scrubbing Agent',mono:'Sc',text:'Manual mode \u2014 I\u2019ll wait for you. Say \u201crun the full scrub\u201d to step through the 9-gate SOP against Forward Line, or ask me about any statement or figure.'},
      ],
      toast:n+' document'+(n===1?'':'s')+' handed off \u00b7 manual scrub \u2014 you drive'});
    setTimeout(()=>this.setState({toast:null}),4200);
  };
  backToIntakeThreads=()=>this.setState({intakeTaskStep:'threads', intakeQuery:''});
  pickIntakeThread=(id)=>{ const th=this.gmailThreads.find(t=>t.id===id); this.setState({intakeThreadId:id, intakeTaskStep:'docs', intakeDocsSel:th?th.docs.map(d=>d.id):[], intakeFrom:'', intakeTo:''}); };
  toggleIntakeDoc=(id)=>this.setState(st=>({intakeDocsSel: st.intakeDocsSel.includes(id)? st.intakeDocsSel.filter(x=>x!==id) : [...st.intakeDocsSel, id]}));
  allIntakeDocs=()=>{ const th=this.gmailThreads.find(t=>t.id===this.state.intakeThreadId); if(th) this.setState({intakeDocsSel:th.docs.map(d=>d.id), intakeFrom:'', intakeTo:''}); };
  clearIntakeDocs=()=>this.setState({intakeDocsSel:[], intakeFrom:'', intakeTo:''});
  applyIntakeRange=()=>{ const {intakeThreadId,intakeFrom,intakeTo}=this.state; const th=this.gmailThreads.find(t=>t.id===intakeThreadId); if(!th||(!intakeFrom&&!intakeTo)) return; const sel=th.docs.filter(d=>(!intakeFrom||d.date>=intakeFrom)&&(!intakeTo||d.date<=intakeTo)).map(d=>d.id); this.setState({intakeDocsSel:sel}); };
  setIntakeFrom=(e)=>this.setState({intakeFrom:e.target.value}, this.applyIntakeRange);
  setIntakeTo=(e)=>this.setState({intakeTo:e.target.value}, this.applyIntakeRange);
  confirmIntakeDocs=()=>{
    const n=this.state.intakeDocsSel.length; if(!n) return;
    const th=this.gmailThreads.find(t=>t.id===this.state.intakeThreadId);
    // hand off to the agents: open a live conversation (scrubbing thread) and play the run
    this._scrubScroll='bottom';
    this.setState({intakeTaskOpen:false, intakeTaskDone:true,
      view:'scrubbing', scrubVariant:'flagged', scrubThread:[], scrubDecided:false, scrubFeedback:{}, scrubHealthResolved:[],
      scrubPopup:null, scrubOcrResolved:false, retargetIndustry:null, srcEdits:{}, srcExpanded:[], srcPanel:null, srcPanelField:null,
      toast:n+' document'+(n===1?'':'s')+' from '+(th?th.from:'Gmail')+' handed to Conversation Intake \u2014 opening the live run'}, this.playIntakeConvo);
    setTimeout(()=>this.setState({toast:null}),4200);
  };
  playIntakeConvo=()=>{
    const run=Date.now(); this._convoRun=run;
    const alive=()=>this._convoRun===run && this.state.scrubVariant==='flagged';
    const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
    const think=async(label,ms)=>{ if(!alive()) return false; this.setState({scrubTyping:true, scrubTypingLabel:label}); await wait(ms); return alive(); };
    const say=(b)=>{ if(alive()) this.pushScrub(b); };
    const stepLabel={
      infoCollectM:'Conversation Intake \u00b7 confirming the document set\u2026',
      appCheck:'Step 1 \u00b7 validating the application against Forward Line\u2026',
      defaultCheck:'Step 2 \u00b7 checking Courts + DataMerch for defaults & fraud\u2026',
      docParseM:'Reconciling the parsed bank statements\u2026',
      trueDeposits:'Step 3 \u00b7 reconciling true deposits \u2014 transfers, P2P, factoring\u2026',
      recurringDebits:'Step 4 \u00b7 mapping recurring debits & active positions\u2026',
      declineRules:'Applying the 9 decline-rule gates\u2026',
      agentText:'Weighing the gates and forming a recommendation\u2026',
      health:'Assembling the submission health summary\u2026',
    };
    (async()=>{
      // ---- parsing phase (one live thinking bubble, cards stream in above it) ----
      if(!await think('Document Parsing Agent \u00b7 parsing 6 documents from Gmail\u2026', 1100)) return;
      say({kind:'agentText',agent:'Document Parsing Agent',mono:'Dp',text:'Received 6 documents from the Gmail thread \u201cBank statements for resubmission\u201d (Raymond Cole \u00b7 Lone Star Freight LLC). Running OCR and field extraction on Dec 2025 \u2013 May 2026\u2026'});
      if(!await think('Document Parsing Agent \u00b7 running OCR & field extraction\u2026', 1550)) return;
      say({kind:'agentText',agent:'Document Parsing Agent',mono:'Dp',text:'Parsed 6 / 6 statements \u00b7 97.1% average extraction. \u26a0 The Feb and Mar statements show tampering signals \u2014 deposit-line font mismatch and balances that don\u2019t reconcile. Both flagged for the scrub.'});
      if(!await think('Scrubbing Agent \u00b7 picking up the parsed set\u2026', 1250)) return;
      say({kind:'agentText',agent:'Scrubbing Agent',mono:'Sc',text:'Picking up the parsed set \u2014 stepping through the 9-gate SOP scrub against Forward Line criteria. Gate-by-gate log follows.'});
      // ---- SOP scrub: stream each block behind its own thinking beat ----
      const seed=this.scrubSeed('flagged');
      for(const b of seed){
        const lbl=stepLabel[b.kind]||'Scrubbing Agent \u00b7 working\u2026';
        const dur=b.kind==='agentText'?1150:(b.kind==='health'||b.kind==='infoCollectM'||b.kind==='docParseM'?820:980);
        if(!await think(lbl, dur)) return;
        say(b);
        if(!alive()) return;
        await wait(360);
        if(!alive()) return;
      }
      if(alive()) this.setState({scrubTyping:false, scrubTypingLabel:''});
    })();
  };
  // ---- Integrations · Gmail — REAL Google OAuth via Google Identity Services ----
  // Atlas' own Google Cloud app. The OAuth client SECRET lives on the backend (authorization-code
  // exchange happens server-side in production). The browser only ever sees the public client ID:
  // set it once here when the workspace app is registered. Dev override: localStorage.atlas_g_client_id.
  GMAIL_CLIENT_ID='';
  gmailCid=()=>this.GMAIL_CLIENT_ID||this.state.gmailClientId;
  openAddIntegration=()=>this.setState({intPickerOpen:true});
  closeAddIntegration=()=>this.setState({intPickerOpen:false});
  pickIntegration=(id)=>{
    if(id==='gmail'){ this.setState({intPickerOpen:false, gmailOpen:true, gmailError:null}); }
    else { this.setState({intPickerOpen:false, toast:(id==='lendsaas'?'LendSaaS':'WhatsApp Business')+' is already connected for this workspace'}); setTimeout(()=>this.setState({toast:null}),3000); }
  };
  openGmail=()=>this.setState({gmailOpen:true, gmailError:null});
  closeGmail=()=>this.setState({gmailOpen:false});
  setGmailDraftSince=(e)=>this.setState({gmailDraftSince:e.target.value});
  changeGmailSince=(e)=>{ const v=e.target.value; if(!v||!this.state.gmail) return; const g={...this.state.gmail, since:v}; this.setState({gmail:g, gmailDraftSince:v}, ()=>{ this.saveGmail(); if(g.status==='connected') this.gmailSync(); }); };
  saveGmail=()=>{ try{ localStorage.setItem('atlas_gmail_integration', JSON.stringify(this.state.gmail)); }catch(_){} };
  relTime=(ts)=>{ if(!ts) return 'Never'; const d=Date.now()-ts; const m=Math.floor(d/60000); if(m<1) return 'Just now'; if(m<60) return m+' min ago'; const h=Math.floor(m/60); if(h<24) return h+(h===1?' hour':' hours')+' ago'; const dd=Math.floor(h/24); return dd+(dd===1?' day':' days')+' ago'; };
  fmtDateLabel=(iso)=>{ if(!iso) return '\u2014'; const p=iso.split('-'); const names=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return names[(+p[1])-1]+' '+(+p[2])+', '+p[0]; };
  loadGsi=()=>{
    if(window.google && window.google.accounts && window.google.accounts.oauth2) return Promise.resolve();
    if(this._gsiP) return this._gsiP;
    this._gsiP=new Promise((res,rej)=>{
      const sc=document.createElement('script'); sc.src='https://accounts.google.com/gsi/client'; sc.async=true;
      sc.onload=()=>res(); sc.onerror=()=>{ this._gsiP=null; rej(new Error('Could not load Google Identity Services \u2014 check network or content blockers.')); };
      document.head.appendChild(sc);
    });
    return this._gsiP;
  };
  gmailToken=(promptMode)=>new Promise((res,rej)=>{
    let settled=false;
    const tm=setTimeout(()=>{ if(!settled){ settled=true; rej(new Error('Google sign-in timed out \u2014 the popup may have been blocked.')); } },120000);
    const done=(fn,v)=>{ if(settled) return; settled=true; clearTimeout(tm); fn(v); };
    try{
      const tc=window.google.accounts.oauth2.initTokenClient({
        client_id:this.gmailCid(),
        scope:'openid email profile https://www.googleapis.com/auth/gmail.readonly',
        prompt:promptMode,
        callback:(resp)=>{ if(resp && resp.access_token){ done(res,resp.access_token); } else { done(rej,new Error((resp&&(resp.error_description||resp.error))||'Google did not return an access token.')); } },
        error_callback:(err)=>{ const t=err&&err.type; const msg= t==='popup_failed_to_open'?'Popup blocked \u2014 allow popups for this page and retry.' : t==='popup_closed'?'Sign-in popup was closed before finishing.' : (err&&err.message)||'Google sign-in failed.'; done(rej,new Error(msg)); },
      });
      tc.requestAccessToken();
    }catch(e){ done(rej,e); }
  });
  gmailFetchAccount=async(token)=>{
    const h={Authorization:'Bearer '+token};
    const ui=await fetch('https://www.googleapis.com/oauth2/v3/userinfo',{headers:h});
    if(!ui.ok) throw new Error('Could not read the Google account profile (HTTP '+ui.status+').');
    const u=await ui.json();
    let msgTotal=null, msgSince=null, apiNote=null;
    const since=(this.state.gmail&&this.state.gmail.since)||this.state.gmailDraftSince;
    try{
      const pr=await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile',{headers:h});
      if(pr.ok){ const p=await pr.json(); msgTotal=(p.messagesTotal!==undefined)?p.messagesTotal:null; }
      else if(pr.status===403){ apiNote='Gmail API is not enabled for this Client ID\u2019s Cloud project \u2014 account verified, mailbox stats unavailable until you enable it.'; }
      if(!apiNote && since){
        const ls=await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=1&q='+encodeURIComponent('after:'+since.replace(/-/g,'/')),{headers:h});
        if(ls.ok){ const l=await ls.json(); msgSince=(l.resultSizeEstimate!==undefined)?l.resultSizeEstimate:null; }
      }
    }catch(_){ apiNote='Mailbox stats unavailable (Gmail API request failed).'; }
    return {email:u.email, name:u.name||u.email, picture:u.picture||'', msgTotal, msgSince, apiNote};
  };
  gmailConnect=async()=>{
    if(this.state.gmailBusy) return;
    const cid=this.gmailCid();
    if(!cid){ this.openGPicker(); return; }
    this.setState({gmailBusy:'connect', gmailError:null});
    try{
      await this.loadGsi();
      const token=await this.gmailToken('consent');
      this._gToken=token;
      const acc=await this.gmailFetchAccount(token);
      const g={ status:'connected', email:acc.email, name:acc.name, picture:acc.picture, since:(this.state.gmail&&this.state.gmail.since)||this.state.gmailDraftSince, lastSync:Date.now(), msgTotal:acc.msgTotal, msgSince:acc.msgSince, apiNote:acc.apiNote||null, connectedAt:Date.now() };
      this.setState({gmail:g, gmailBusy:null, toast:'Gmail connected \u2014 '+acc.email}, this.saveGmail);
      this.raiseIntakeNotif(); this.showTaskSnack();
      setTimeout(()=>this.setState({toast:null}),3600);
    }catch(e){ this.setState({gmailBusy:null, gmailError:(e&&e.message)||'Google sign-in failed.'}); }
  };
  gmailSync=async()=>{
    if(!this.state.gmail || this.state.gmailBusy) return;
    if(this.state.gmail.mock){
      this.setState({gmailBusy:'sync', gmailError:null});
      setTimeout(()=>{ const ng={...this.state.gmail, lastSync:Date.now(), msgSince:(this.state.gmail.msgSince||0)+Math.floor(Math.random()*4)};
        this.setState({gmail:ng, gmailBusy:null, toast:'Synced with Gmail just now'}, this.saveGmail);
        setTimeout(()=>this.setState({toast:null}),3000); },900);
      return;
    }
    this.setState({gmailBusy:'sync', gmailError:null});
    try{
      await this.loadGsi();
      if(!this._gToken) this._gToken=await this.gmailToken('');
      let acc;
      try{ acc=await this.gmailFetchAccount(this._gToken); }
      catch(_){ this._gToken=await this.gmailToken(''); acc=await this.gmailFetchAccount(this._gToken); }
      const ng={...this.state.gmail, status:'connected', email:acc.email, name:acc.name, picture:acc.picture, lastSync:Date.now(), msgTotal:acc.msgTotal, msgSince:acc.msgSince, apiNote:acc.apiNote||null};
      this.setState({gmail:ng, gmailBusy:null, toast:'Synced with Gmail just now'}, this.saveGmail);
      setTimeout(()=>this.setState({toast:null}),3000);
    }catch(e){ this.setState({gmailBusy:null, gmailError:(e&&e.message)||'Sync failed \u2014 sign in to Google again.'}); }
  };
  // ===== Simulated Google account chooser =====
  gAccounts=[
    {name:'Diana Koenig', email:'diana@northbridge.co', ava:'#7c5cf0', msgTotal:3182, msgSince:247},
    {name:'Diana Koenig', email:'dkoenig.mca@gmail.com', ava:'#188544', msgTotal:12408, msgSince:96},
  ];
  openGPicker=()=>this.setState({gPickerOpen:true, gPickerBusy:null, gPickerOther:false, gPickerEmail:'', gmailError:null});
  closeGPicker=()=>{ if(this.state.gPickerBusy) return; this.setState({gPickerOpen:false, gmailBusy:null}); };
  gPickerChoose=(acc)=>{
    if(this.state.gPickerBusy) return;
    this.setState({gPickerBusy:acc.email});
    setTimeout(()=>{
      const g={ status:'connected', mock:true, email:acc.email, name:acc.name, picture:'', since:(this.state.gmail&&this.state.gmail.since)||this.state.gmailDraftSince, lastSync:Date.now(), msgTotal:acc.msgTotal, msgSince:acc.msgSince, apiNote:null, connectedAt:Date.now() };
      this.setState({gmail:g, gPickerOpen:false, gPickerBusy:null, gmailBusy:null, toast:'Gmail connected \u2014 '+acc.email}, this.saveGmail);
      this.raiseIntakeNotif(); this.showTaskSnack();
      setTimeout(()=>this.setState({toast:null}),3600);
    },1100);
  };
  gPickerUseOther=()=>this.setState({gPickerOther:true});
  gPickerOtherGo=()=>{
    const em=(this.state.gPickerEmail||'').trim();
    if(!/^\S+@\S+\.\S+$/.test(em)) return;
    const local=em.split('@')[0].replace(/[._-]+/g,' ').trim();
    const name=local?local.split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' '):'Google user';
    this.gPickerChoose({name, email:em, ava:'#b26205', msgTotal:6034, msgSince:118});
  };
  gmailDisconnect=()=>{
    const t=this._gToken; this._gToken=null;
    try{ if(t && window.google && window.google.accounts && window.google.accounts.oauth2) window.google.accounts.oauth2.revoke(t, ()=>{}); }catch(_){}
    const g={...this.state.gmail, status:'disconnected'};
    this.setState({gmail:g, toast:'Gmail disconnected \u2014 EasyMCA no longer has access'}, this.saveGmail);
    setTimeout(()=>this.setState({toast:null}),3200);
  };
  // OCR low-confidence manual review (Document Parsing did a bad job on one field)
  openScrubOcr=()=>this.setState({scrubOcrOpen:true});
  closeScrubOcr=()=>this.setState({scrubOcrOpen:false});
  setScrubOcrValue=(e)=>this.setState({scrubOcrValue:e.target.value});
  setSrcEdit=(id,val)=>this.setState(s=>({srcEdits:{...s.srcEdits,[id]:val}}));
  toggleSrcRow=(id)=>this.setState(s=>({srcExpanded:s.srcExpanded.includes(id)?s.srcExpanded.filter(x=>x!==id):[...s.srcExpanded,id]}));
  confirmScrubOcr=()=>{ this.setState({scrubOcrOpen:false, scrubOcrResolved:true, toast:'Avg daily balance verified manually · extraction upgraded to confirmed'}); this.pushScrub({kind:'agentText',agent:'Document Parsing Agent',mono:'Dp',text:'Manual review logged — avg daily balance confirmed at '+this.state.scrubOcrValue+'. That field was a low-confidence read (smudged page on the April statement); it’s now marked Verified and locked to the audit trail. Overall extraction is back above 98%.'}); setTimeout(()=>this.setState({toast:null}),4200); };
  // Re-target (revenue floor) — only clears when the user confirms the industry is trucking
  openRetarget=()=>this.setState({retargetIndustry:null, scrubPopup:'retarget'});
  setRetargetIndustry=(id)=>this.setState({retargetIndustry:id});
  confirmRetarget=()=>{ const ind=this.state.retargetIndustry; if(!ind) return; if(ind==='trucking'){ this.resolveScrubHealth('floor'); this.setState({scrubPopup:null, toast:'Re-targeted to Bedrock Funding · trucking B/C-paper accepts $142k/mo'}); this.pushScrub({kind:'agentText',agent:'Funder Intelligence Agent',mono:'Fn',text:'Industry confirmed as trucking. Re-targeted to Bedrock Funding (min $25k/mo, accepts trucking + a resolution letter). The A-paper revenue-floor flag clears for B/C-paper — running the scrub against Bedrock now.'}); } else { const lbl={construction:'construction',other:'general / other'}[ind]; this.setState({scrubPopup:null, toast:'Industry isn’t trucking — re-target not applied'}); this.pushScrub({kind:'agentText',agent:'Funder Intelligence Agent',mono:'Fn',text:'Industry is '+lbl+', not trucking — so the trucking B/C-paper programs don’t apply. The $200k A-paper revenue floor still stands and this deal stays below the funder minimum at $142k/mo. The floor flag remains open.'}); } setTimeout(()=>this.setState({toast:null}),4200); };
  shareScrubSummary=()=>{ try{ if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText('EasyMCA — submission health summary'); }catch(e){} this.setState({toast:'Summary copied — ready to paste into WhatsApp or email'}); setTimeout(()=>this.setState({toast:null}),3000); };

  // Marcus \u2014 renewals
  toggleRenewal=(id)=>this.setState(s=>({renewals:s.renewals.map(r=>r.id===id?{...r,approved:!r.approved,skipped:false}:r)}));
  skipRenewal=(id)=>this.setState(s=>({renewals:s.renewals.map(r=>r.id===id?{...r,skipped:!r.skipped,approved:false}:r)}));
  editRenewal=(id,text)=>this.setState(s=>({renewals:s.renewals.map(r=>r.id===id?{...r,draft:text}:r)}));
  sendRenewals=()=>{
    const ok=this.state.renewals.filter(r=>r.approved);
    if(!ok.length){ this.setState({toast:'Pick at least one renewal to send'}); setTimeout(()=>this.setState({toast:null}),2200); return; }
    const wa=ok.filter(r=>r.channel==='WhatsApp').length, em=ok.filter(r=>r.channel==='Email').length;
    const parts=[]; if(wa) parts.push(wa+' via WhatsApp'); if(em) parts.push(em+' via email');
    this.setState({toast:'Outreach sent to '+ok.length+' merchant'+(ok.length>1?'s':'')+' \u00b7 '+parts.join(' \u00b7 ')+' \u00b7 logged in HubSpot',
      renewals:this.state.renewals.map(r=>r.approved?{...r,approved:false,skipped:true,sent:true}:r)});
    setTimeout(()=>this.setState({toast:null}),4500);
  };

  // ---- command bar ----
  setCmd = (e) => this.setState({cmd:e.target.value});
  cmdKey = (e) => { if(e.key==='Enter') this.submitCmd(); };
  submitCmd = () => { const t=this.state.cmd.trim(); const f=this.state.cmdFiles; if(!t && !f.length) return; const txt = t || ('Please review the '+f.length+' document'+(f.length>1?'s':'')+' I just attached.'); const full = f.length ? txt+' \u2014 attached: '+f.join(', ') : txt; this.setState({cmd:'', cmdFiles:[]}); this.routeCommand(full); };
  attachCmd = () => this.cmdFileRef.current && this.cmdFileRef.current.click();
  onCmdFiles = (e) => { const names=[...(e.target.files||[])].map(f=>f.name); if(names.length) this.setState(s=>({cmdFiles:[...s.cmdFiles,...names]})); e.target.value=''; };
  removeCmdFile = (i) => this.setState(s=>({cmdFiles:s.cmdFiles.filter((_,j)=>j!==i)}));
  routeCommand(t){
    const low=t.toLowerCase();
    const p=this.state.persona;
    if(p==='diana'){
      if(low.includes('underwrit')||low.includes('sunrise')){ this.openDeal('sunrise'); if(!this.state.decided) setTimeout(()=>this.askUw('Run underwriting on this deal.'),350); return; }
      if(low.includes('missing')||low.includes('document')){ this.openDeal('verde'); return; }
    } else if(p==='marcus'){
      if(low.includes('intake')||low.includes('whatsapp')||low.includes('auto')){ this.goIntake(); return; }
      if(low.includes('scrub')||low.includes('cinnamon')||low.includes('forward')){ this.openScrub('cinnamon'); if(!this.state.scrubDecided) setTimeout(()=>this.askScrub('Scrub this deal before I send it to Forward Line.'),350); return; }
      if(low.includes('renew')){ this.setState({view:'renewals'}); return; }
      if(low.includes('match')||low.includes('funder')){ this.openScrub('hayden'); return; }
    } else if(p==='talia'){
      if(low.includes('fund')||low.includes('review')||low.includes('cinnamon')||low.includes('inbound')){ this.openFundability('cinnamon'); return; }
    }
    this.setState({view:'chat', chatThread:[]}); setTimeout(()=>this.askChat(t),300);
  }

  // ---- underwriting chat ----
  setUwInput=(e)=>this.setState({uwInput:e.target.value});
  uwKey=(e)=>{ if(e.key==='Enter') this.sendUw(); };
  sendUw=()=>{ const t=this.state.uwInput.trim(); if(!t) return; this.setState({uwInput:''}); this.askUw(t); };
  pushUw=(b)=>{ this._uwScroll='bottom'; this.setState(s=>({uwThread:[...s.uwThread,b]})); };
  askUw(text){
    this.pushUw({kind:'user',text});
    const low=text.toLowerCase();
    let label='Underwriting Agent is analyzing 4 statements\u2026';
    this.setState({typing:true,typingLabel:label});
    const run=(fn)=>setTimeout(()=>{ this.setState({typing:false}); fn(); }, 1200);
    if(/45|forty/.test(low)){ this.setState({typingLabel:'Recalculating at $45,000\u2026'}); run(()=>this.applyScenario(45000)); return; }
    if(/75|seventy/.test(low)){ this.setState({typingLabel:'Recalculating at $75,000\u2026'}); run(()=>this.applyScenario(75000)); return; }
    if(low.includes('approve')){ run(()=>this.approve()); return; }
    if(low.includes('nsf')||low.includes('flag')){ run(()=>this.pushUw({kind:'agentText',confidence:84,text:'All three NSFs fall inside March 2026 and clear within the same statement cycle — consistent with a one-off seasonal cash dip rather than chronic mismanagement. Revenue in April and May fully recovered. I weighted it as a medium, not a disqualifier.'})); return; }
    if(low.includes('underwrit')||low.includes('run')){ run(()=>this.runUnderwriting(60000)); return; }
    run(()=>this.pushUw({kind:'agentText',confidence:null,text:'I can run a full underwriting recommendation, model a different advance amount, or explain any of the scrub flags. What would you like?'}));
  }
  runUnderwriting(amount){ this.setState({scenario:amount}); this.pushUw({kind:'underwriting',rec:this.recFor(amount)}); }
  applyScenario(amount){
    this.setState({scenario:amount});
    const r=this.recFor(amount);
    this.pushUw({kind:'agentText',confidence:r.conf,text:'Re-ran the model at '+this.fmtMoney(amount)+'. Confidence moves to '+r.conf+'% and the daily debit lands at '+r.debit+'% of average daily deposits.'});
    this.pushUw({kind:'underwriting',rec:r});
  }
  setScenario=(amount)=>{ if(amount===this.state.scenario) return; this.setState({typing:true,typingLabel:'Recalculating at '+this.fmtMoney(amount)+'\u2026',factorAdj:0}); setTimeout(()=>{ this.setState({typing:false}); this.applyScenario(amount); },1000); };
  approve=()=>{ const base=this.recFor(this.state.scenario); const r={...base, factor:+(base.factor+this.state.factorAdj).toFixed(2)}; r.payback=r.amount*r.factor; r.daily=Math.round(r.payback/Math.round(r.term*21.7)); this.pushUw({kind:'decision',rec:r,adj:this.state.factorAdj}); this.setState(s=>({decided:true,decidedToday:s.decidedToday+1,queueCount:Math.max(0,s.queueCount-1),toast:'Decision logged \u00b7 LendSaaS updated \u00b7 broker notified'})); setTimeout(()=>this.setState({toast:null}),4500); };
  decline=()=>{ this.pushUw({kind:'agentText',confidence:null,text:'Understood. What\u2019s the primary decline reason? I\u2019ll log a structured reason code and draft a decline notice for Marcus to review before it goes out.'}); };
  escalate=()=>{ this.setState({toast:'Escalated to underwriting supervisor for review'}); setTimeout(()=>this.setState({toast:null}),3800); };

  // ---- unified chat ----
  setChatInput=(e)=>this.setState({chatInput:e.target.value});
  chatKey=(e)=>{ if(e.key==='Enter') this.sendChat(); };
  sendChat=()=>{ const t=this.state.chatInput.trim(); const f=this.state.chatFiles; if(!t && !f.length) return; const txt = t || ('Here '+(f.length>1?'are':'is')+' '+f.length+' document'+(f.length>1?'s':'')+' for you.'); this.setState({chatInput:'', chatFiles:[]}); this.askChat(txt, f); };
  attachChat=()=>this.chatFileRef.current && this.chatFileRef.current.click();
  onChatFiles=(e)=>{ const names=[...(e.target.files||[])].map(f=>f.name); if(names.length) this.setState(s=>({chatFiles:[...s.chatFiles,...names]})); e.target.value=''; };
  removeChatFile=(i)=>this.setState(s=>({chatFiles:s.chatFiles.filter((_,j)=>j!==i)}));
  pushChat=(b)=>this.setState(s=>({chatThread:[...s.chatThread,b]}));
  askChat(text, files){
    this.pushChat({kind:'user',text,files:files||[]});
    const low=text.toLowerCase();
    if(low.includes('volume')||low.includes('funder')){
      this.setState({activeAgent:'data',chatTyping:true,chatTypingLabel:'Querying HubSpot + LendSaaS\u2026'});
      setTimeout(()=>{ this.setState({chatTyping:false}); this.pushChat({kind:'dataTable'}); },1400); return;
    }
    if(low.includes('approval rate')){
      this.setState({activeAgent:'data',chatTyping:true,chatTypingLabel:'Crunching approval rates\u2026'});
      setTimeout(()=>{ this.setState({chatTyping:false}); this.pushChat({kind:'agentText',agent:'Data Intelligence Agent',mono:'Da',text:'Bedrock Funding had the highest approval rate last month at 71%, followed by Pinnacle at 64%. Capital Stack trailed at 48% — most declines were stacked-position deals.'}); },1300); return;
    }
    if(low.includes('renew')){
      this.setState({activeAgent:'renewal',chatTyping:true,chatTypingLabel:'Renewal Agent scanning the portfolio\u2026'});
      setTimeout(()=>{ this.setState({chatTyping:false}); this.pushChat({kind:'agentText',agent:'Renewal Agent',mono:'Rn',text:'Three merchants cross their renewal window in the next 30 days: Brick & Mortar Cafe (82% repaid), Bella Boutique (78%), and Summit Logistics (76%). I\u2019ve drafted outreach for each — want to review and approve?'}); },1300); return;
    }
    this.setState({chatTyping:true,chatTypingLabel:'Routing to the right agent\u2026'});
    setTimeout(()=>{ this.setState({chatTyping:false}); this.pushChat({kind:'agentText',agent:'Advisory Agent',mono:'Ad',text:'Happy to help with that. I can pull pipeline data, compare funder programs, explain offer terms, or hand off to a specialist agent — point me at what you need.'}); },1200);
  }
  setAgent=(id)=>this.setState({activeAgent:id});
  // ---- composer agent picker ----
  toggleAgentMenu=()=>this.setState(s=>({agentMenuOpen:!s.agentMenuOpen}));
  closeAgentMenu=()=>this.setState({agentMenuOpen:false});
  pickComposerAgent=(id)=>this.setState(s=>({composerAgent:id, agentMenuOpen:false, activeAgent:id==='all'?s.activeAgent:id}));
  // ---- source onboarding ----
  onboardPick=(id)=>{ this.setState({onboardOpen:false, onboardDone:true, freshSignup:false}); if(id==='gmail'){ this.setState({view:'integrations', gmailOpen:true, gmailError:null}); } else { const nm=id==='lendsaas'?'LendSaaS':'WhatsApp Business'; this.setState({view:'integrations', toast:nm+' connected \u2014 your agents can now read from it'}); setTimeout(()=>this.setState({toast:null}),3600); } };
  onboardSkip=()=>this.setState({onboardOpen:false});
  openOnboard=()=>this.setState({onboardOpen:true});
  dismissSourcePrompt=()=>this.setState({sourcePromptDismissed:true});
  // ---- top task snackbar (post gmail integration) ----
  showTaskSnack=()=>{ this._taskSnackT&&clearTimeout(this._taskSnackT); this.setState({taskSnack:{title:'New task \u00b7 Confirmation required \u2014 documents to intake', sub:'Lone Star Freight \u00b7 6 attachments found in Gmail \u00b7 leads into the scrub'}}); this._taskSnackT=setTimeout(()=>this.setState({taskSnack:null}),10000); };
  dismissTaskSnack=()=>{ this._taskSnackT&&clearTimeout(this._taskSnackT); this.setState({taskSnack:null}); };
  openTaskSnack=()=>{ this.dismissTaskSnack(); this.runNotifCta('intake'); };

  notifVals(s){
    const notifs=s.notifs||[];
    const unread=notifs.filter(n=>!n.read).length;
    const notifList=notifs.map(n=>({...n,
      onClick:()=>this.clickNotif(n.id,n.cta),
      rowStyle:'width:100%;display:flex;align-items:flex-start;gap:10px;padding:11px 15px;border:none;border-bottom:1px solid var(--border);cursor:pointer;text-align:left;background:'+(n.read?'var(--surface)':'var(--accent-bg)'),
      dotStyle:'width:7px;height:7px;border-radius:50%;flex:none;margin-top:6px;background:'+(n.read?'transparent':'var(--accent)'),
      monoStyle:'width:26px;height:26px;border-radius:7px;flex:none;display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);'+(n.tone==='warn'?'background:var(--warn-bg);color:var(--warn)':n.tone==='bad'?'background:var(--bad-bg);color:var(--bad)':'background:var(--accent-bg);color:var(--accent)'),
    }));
    return { notifOpen:!!s.notifOpen, toggleNotifs:this.toggleNotifs, closeNotifs:this.closeNotifs, markAllNotifsRead:this.markAllNotifsRead, notifList, hasUnreadNotifs:unread>0, notifEmpty:notifs.length===0 };
  }

  // ---- styling helpers ----
  navStyle(id){
    const active=this.activeNav()===id;
    return 'display:flex;align-items:center;gap:9px;padding:6px 8px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:500;text-decoration:none;transition:background .12s,color .12s;'+(active?'background:var(--side-active-bg);color:var(--text)':'color:var(--side-text);background:transparent');
  }
  activeNav(){ const v=this.state.view; if(v==='underwriting'||v==='scrubbing'||v==='renewals'||v==='intake'||v==='fundability'||v==='agentConfig')return 'agents'; if(v==='chat')return 'conversations'; return v; }
  stageStyle(kind){
    const c={ready:['#2461d9','#edf3fe'],ok:['var(--ok)','var(--ok-bg)'],warn:['var(--warn)','var(--warn-bg)'],bad:['var(--bad)','var(--bad-bg)'],neu:['var(--text2)','var(--surface2)']}[kind];
    return 'display:inline-flex;align-items:center;font:500 11px var(--sans);color:'+c[0]+';background:'+c[1]+';padding:2px 8px;border-radius:999px;white-space:nowrap';
  }
  autoStyle(a){
    if(a==='Automate') return 'font:500 11px var(--sans);color:var(--accent);background:var(--accent-bg);padding:2px 8px;border-radius:999px';
    if(a==='Confirm') return 'font:500 11px var(--sans);color:var(--warn);background:var(--warn-bg);padding:2px 8px;border-radius:999px';
    return 'font:500 11px var(--sans);color:var(--text2);background:var(--surface2);padding:2px 8px;border-radius:999px';
  }

  renderVals(){
    const s=this.state;
    const v=s.view;
    const p=s.persona;
    const isDiana=p==='diana';
    const isMarcus=p==='marcus';
    const isTalia=p==='talia';
    const byP=(d,m,t)=>p==='diana'?d:p==='marcus'?m:t;
    const navIds=['home','conversations','agents','tasks','workflows','knowledge','integrations','organizations','settings'];
    const nav={};
    navIds.forEach(id=>{ nav['nav'+id.charAt(0).toUpperCase()+id.slice(1)] = this.navStyle(id); });

    // persona switcher pill styling
    const psPill=(active)=>'width:100%;display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;border:none;cursor:pointer;font-family:var(--sans);font-size:12.5px;font-weight:500;text-align:left;transition:all .12s;'+(active?'background:var(--side-active-bg);color:var(--text)':'background:transparent;color:var(--side-text)');
    const psAva=(active,grad)=>'width:22px;height:22px;border-radius:50%;background:'+grad+';color:#fff;display:flex;align-items:center;justify-content:center;font:600 9.5px var(--mono);flex:none;opacity:'+(active?'1':'.7');

    // command chips
    const chip=(label,q,icon)=>({label,icon:icon||'✦',onClick:()=>this.routeCommand(q)});
    const cmdChips=byP([
      chip('Run underwriting on Sunrise','Run underwriting on Sunrise Auto Repair','✓'),
      chip('Find missing documents','Find missing documents','✉'),
      chip('Funded volume this month','What was our funded volume last month by funder?','≡'),
      chip('Who\u2019s renewing soon?','Show merchants renewing next month','↻'),
    ],[
      chip('Run WhatsApp auto-intake','Run the WhatsApp auto-intake pipeline','☎'),
      chip('Scrub Cinnamon Trail','Scrub Cinnamon Trail Coffee against Forward Line','✓'),
      chip('Show renewals','Show merchants renewing this month','↻'),
      chip('Match Hayden to funders','Match Hayden Auto Wash to the best funders','≡'),
    ],[
      chip('Review next inbound','Review the next inbound deal for funding','☆'),
      chip('Show fundable deals','Show me fundable inbound deals','✓'),
      chip('Funded volume this month','What was our funded volume last month by funder?','≡'),
      chip('Which brokers send the best deals?','Which brokers send the highest-fundability deals?'),
    ]);

    // approvals (persona-specific)
    const approvalsDiana=[
      {mono:'Uw',title:'Underwriting recommendation ready',sub:'Sunrise Auto Repair \u00b7 $60,000 \u00b7 87% confidence',tag:'Review',tagKind:'ready',onClick:()=>this.openDeal('sunrise')},
      {mono:'Uw',title:'Escalation \u2014 confidence below threshold',sub:'Coastal Dental Group \u00b7 $120,000 \u00b7 64% confidence',tag:'Escalated',tagKind:'bad',onClick:()=>this.openDeal('coastal')},
      {mono:'Ic',title:'Re-upload requested from merchant',sub:'Verde Landscaping \u00b7 March statement illegible',tag:'Waiting',tagKind:'warn',onClick:()=>this.openDeal('verde')},
    ];
    const ciAuto=this.autonomyOf('conversationintake');
    const ciTaskSub=ciAuto==='Automate'?'Lone Star Freight \u00b7 6 attachments in Gmail \u00b7 autonomy: Automate \u2014 auto-ingests':(ciAuto==='Suggest'?'Lone Star Freight \u00b7 6 attachments in Gmail \u00b7 autonomy: Suggest':'Lone Star Freight \u00b7 6 attachments in Gmail \u00b7 autonomy: Confirm');
    const approvalsMarcus=[
      {mono:'Ci',title:'Confirm documents to intake',sub:ciTaskSub,tag:s.intakeTaskDone?'Done':(ciAuto==='Automate'?'Auto':ciAuto),tagKind:s.intakeTaskDone?'ok':(ciAuto==='Automate'?'ok':'ready'),onClick:this.openIntakeTask},
      {mono:'Rn',title:'Renewal outreach drafted \u2014 3 merchants',sub:'Calzona Tacos, Eden Greens, Brookside Books \u00b7 in the 30-day window',tag:'Review',tagKind:'ready',onClick:()=>this.go('renewals')},
      {mono:'Sc',title:'Scrub ready \u2014 missing one statement',sub:'Cinnamon Trail Coffee \u00b7 $40,000 \u00b7 going to Forward Line',tag:'1 flag',tagKind:'warn',onClick:()=>this.openScrub('cinnamon')},
      {mono:'Ou',title:'Lead qualified \u2014 ready to submit',sub:'Sofia\u2019s Bakery \u00b7 collected overnight via WhatsApp',tag:'Submit',tagKind:'ok',onClick:()=>this.setState({view:'chat',activeAgent:'outreach',chatThread:[]})},
    ];
    const approvalsTalia=[
      {mono:'Uw',title:'Fundable \u2014 ready for your decision',sub:'Cinnamon Trail Coffee \u00b7 $40,000 \u00b7 82 fundability',tag:'Decide',tagKind:'ready',onClick:()=>this.openFundability('cinnamon')},
      {mono:'Uw',title:'Needs review \u2014 mid fundability',sub:'Orchard Hardware \u00b7 $90,000 \u00b7 61 fundability',tag:'Review',tagKind:'warn',onClick:()=>this.openFundability('orchard')},
      {mono:'Fn',title:'New broker submission via WhatsApp',sub:'Lumen Yoga Studio \u00b7 $32,000 \u00b7 from Marcus Vega',tag:'New',tagKind:'ok',onClick:()=>this.openFundability('lumen')},
    ];
    const approvals=(byP(approvalsDiana,approvalsMarcus,approvalsTalia)).map(a=>({...a,tagStyle:this.stageStyle(a.tagKind)}));

    // activity (persona-specific)
    const adot=(k)=>{ const c={done:'var(--ok)',waiting:'var(--warn)',alert:'var(--bad)'}[k]||'var(--text3)'; return 'width:6px;height:6px;border-radius:50%;background:'+c+';flex:none;margin-top:7px'; };
    const activityDiana=[
      {mono:'Dp',agent:'Document Parsing Agent',text:'extracted 4 statements for Sunrise Auto Repair at 98.2% confidence.',time:'9:12 AM',k:'done'},
      {mono:'Sc',agent:'Scrubbing Agent',text:'scrubbed Brick & Mortar Cafe \u2014 91/100, zero flags.',time:'9:08 AM',k:'done'},
      {mono:'Ic',agent:'Information Collection Agent',text:'requested the March statement from Verde Landscaping via WhatsApp.',time:'8:54 AM',k:'waiting'},
      {mono:'Dh',agent:'Deal Health Agent',text:'flagged Summit Logistics \u2014 revenue down 12% month-over-month.',time:'8:40 AM',k:'alert'},
      {mono:'Fn',agent:'Funder Intelligence Agent',text:'matched Coastal Dental to 3 candidate funders.',time:'8:30 AM',k:'done'},
    ];
    const activityMarcus=[
      {mono:'Ou',agent:'Outreach Agent',text:'qualified Sofia\u2019s Bakery overnight on WhatsApp \u2014 all docs collected.',time:'6:42 AM',k:'done'},
      {mono:'Rn',agent:'Renewal Agent',text:'flagged 3 merchants crossing the 75% renewal threshold this month.',time:'7:00 AM',k:'done'},
      {mono:'Sc',agent:'Scrubbing Agent',text:'flagged Cinnamon Trail Coffee \u2014 missing June statement before Forward Line submission.',time:'8:14 AM',k:'waiting'},
      {mono:'Fn',agent:'Funder Intelligence Agent',text:'matched Hayden Auto Wash to 4 candidate funders \u2014 Pinnacle recommended.',time:'8:50 AM',k:'done'},
      {mono:'Ic',agent:'Information Collection Agent',text:'requested 2 documents from Riverside Salon via email.',time:'Yesterday',k:'done'},
    ];
    const activityTalia=[
      {mono:'Ci',agent:'Conversation Intake Agent',text:'received a new submission from Marcus Vega on WhatsApp Business.',time:'9:02 AM',k:'done'},
      {mono:'Dp',agent:'Document Parsing Agent',text:'parsed Cinnamon Trail\u2019s 4 statements at 97.8% extraction.',time:'9:03 AM',k:'done'},
      {mono:'Uw',agent:'Underwriting Agent',text:'scored Cinnamon Trail at 82 fundability \u2014 ready for your decision.',time:'9:04 AM',k:'done'},
      {mono:'Uw',agent:'Underwriting Agent',text:'flagged Pixel Print Co. at 43 \u2014 stacked positions, weak.',time:'7:56 AM',k:'alert'},
      {mono:'Fn',agent:'Funder Routing Agent',text:'confirmed Maple & Co. funded yesterday \u2014 contract synced.',time:'Yesterday',k:'done'},
    ];
    const activity=(byP(activityDiana,activityMarcus,activityTalia)).map(e=>({...e,dotStyle:adot(e.k)}));

    // queues
    const mkQueue=(arr,opener)=>arr.map(d=>({
      ...d, amountFmt:d.amount?this.fmtMoney(d.amount):'\u2014', stageStyle:this.stageStyle(d.stageKind),
      onClick:()=>opener(d.id),
      rowStyle:'padding:11px 12px;border-radius:10px;cursor:pointer;margin-bottom:2px;border:1px solid '+(s.dealId===d.id?'var(--border2)':'transparent')+';background:'+(s.dealId===d.id?'var(--surface2)':'transparent')+';transition:background .12s',
    }));
    const queue=mkQueue(this.queueData,(id)=>this.openDeal(id));
    const scrubQueue=mkQueue(this.scrubQueue,(id)=>this.openScrub(id));

    // deal headers
    const dealNames={sunrise:'Sunrise Auto Repair',coastal:'Coastal Dental Group',verde:'Verde Landscaping',brick:'Brick & Mortar Cafe',summit:'Summit Logistics',bella:'Bella Boutique'};
    const dd=this.queueData.find(d=>d.id===s.dealId)||this.queueData[0];
    const deal={ name:dealNames[s.dealId]||dd.name, amountFmt:this.fmtMoney(dd.amount), meta:'Submission UW-4821 \u00b7 linked to LendSaaS application \u00b7 broker Marcus Vega' };
    const scrubDealMap={cinnamon:{name:'Cinnamon Trail Coffee',amount:40000,funder:'Forward Line',meta:'Austin, TX \u00b7 Food & Bev \u00b7 3.8 yrs in business \u00b7 HubSpot deal HS-9417'}, sofia:{name:'Sofia\u2019s Bakery',amount:25000,funder:'(matching)',meta:'Collected via WhatsApp \u00b7 still picking a funder'}, hayden:{name:'Hayden Auto Wash',amount:55000,funder:'Pinnacle Advance',meta:'Submitted yesterday \u00b7 awaiting decision'}, riverside:{name:'Riverside Salon',amount:30000,funder:'Capital Stack',meta:'Submitted yesterday'}, calzona:{name:'Calzona Tacos',amount:0,funder:'\u2014',meta:'Renewal eligible \u00b7 82% repaid'}, harbor:{name:'Harborlight Print',amount:18000,funder:'Bedrock',meta:'Declined yesterday \u2014 stacked positions'}};
    const sdMeta=scrubDealMap[s.dealId]||scrubDealMap.cinnamon;
    const scrubDeal = s.scrubVariant==='flagged'
      ? {name:'Lone Star Freight LLC', amountFmt:this.fmtMoney(75000), funder:'Forward Line', meta:'El Paso, TX \u00b7 Trucking \u00b7 5.1 yrs in business \u00b7 HubSpot deal HS-9602'}
      : {name:sdMeta.name, amountFmt:sdMeta.amount?this.fmtMoney(sdMeta.amount):'\u2014', funder:sdMeta.funder, meta:sdMeta.meta};

    // scrub popup data
    const sp=s.scrubPopup;
    const flaggedV=s.scrubVariant==='flagged';
    const popupData={
      deposit_transfers:{title:'Transfers from personal accounts',sub:'Excluded \u2014 internal moves, not revenue',count:3,total:flaggedV?'\u2212$12,800':'\u2212$14,200',negColor:'var(--text2)',
        rows:flaggedV?[{date:'Apr 3',desc:'Transfer from R. Cole personal checking',channel:'Internal ACH \u2022\u20222210',amount:'\u2212$5,200'},{date:'Apr 14',desc:'Transfer from R. Cole savings',channel:'Internal ACH \u2022\u20222210',amount:'\u2212$4,600'},{date:'Apr 25',desc:'Transfer from R. Cole personal checking',channel:'Internal ACH \u2022\u20222210',amount:'\u2212$3,000'}]:[{date:'May 4',desc:'Transfer from D. Whitfield personal',channel:'Internal ACH \u2022\u20221190',amount:'\u2212$6,000'},{date:'May 16',desc:'Transfer from D. Whitfield savings',channel:'Internal ACH \u2022\u20221190',amount:'\u2212$5,200'},{date:'May 27',desc:'Transfer from D. Whitfield personal',channel:'Internal ACH \u2022\u20221190',amount:'\u2212$3,000'}]},
      deposit_p2p:{title:'Zelle / Venmo / PayPal / Cash App',sub:'Excluded \u2014 SOP removes peer-payment apps',count:flaggedV?5:4,total:flaggedV?'\u2212$9,400':'\u2212$6,100',negColor:'var(--text2)',
        rows:flaggedV?[{date:'Apr 2',desc:'Zelle from multiple senders',channel:'Zelle',amount:'\u2212$2,400'},{date:'Apr 9',desc:'Venmo transfer',channel:'Venmo',amount:'\u2212$1,900'},{date:'Apr 15',desc:'Cash App deposit',channel:'Cash App',amount:'\u2212$2,200'},{date:'Apr 22',desc:'PayPal transfer',channel:'PayPal',amount:'\u2212$1,500'},{date:'Apr 28',desc:'Zelle from R. Cole',channel:'Zelle',amount:'\u2212$1,400'}]:[{date:'May 6',desc:'Zelle from customer',channel:'Zelle',amount:'\u2212$1,800'},{date:'May 13',desc:'Venmo transfer',channel:'Venmo',amount:'\u2212$1,500'},{date:'May 20',desc:'PayPal transfer',channel:'PayPal',amount:'\u2212$1,600'},{date:'May 28',desc:'Cash App deposit',channel:'Cash App',amount:'\u2212$1,200'}]},
      deposit_refunds:{title:'Refunds & purchase returns',sub:'Excluded \u2014 reversals, not new revenue',count:2,total:flaggedV?'\u2212$2,100':'\u2212$1,200',negColor:'var(--text2)',
        rows:flaggedV?[{date:'Apr 11',desc:'Vendor refund \u2014 fuel card',channel:'ACH reversal',amount:'\u2212$1,300'},{date:'Apr 19',desc:'Returned payment',channel:'ACH reversal',amount:'\u2212$800'}]:[{date:'May 9',desc:'Customer refund',channel:'Card reversal',amount:'\u2212$700'},{date:'May 21',desc:'Returned order',channel:'Card reversal',amount:'\u2212$500'}]},
      deposit_factoring:{title:'Factoring / advance payments',sub:'Excluded \u2014 financed receivables, not organic revenue',count:1,total:'\u2212$5,000',negColor:'var(--text2)',
        rows:[{date:'Apr 7',desc:'RTS Financial \u2014 invoice factoring advance',channel:'ACH \u2022\u20227740',amount:'\u2212$5,000'}]},
      negdays:{title:'Negative-balance days',sub:'Source \u2014 daily ledger balances from parsed statements',count:flaggedV?9:1,total:'',negColor:flaggedV?'var(--bad)':'var(--ok)',
        rows:flaggedV?[{date:'Jan 18',amount:'\u2212$1,240.55',desc:'Apex MCA debit cleared first',balance:'\u2212$1,240'},{date:'Feb 6',amount:'\u2212$880.20',desc:'Fuel + ACH same day',balance:'\u2212$880'},{date:'Feb 27',amount:'\u2212$2,110.00',desc:'Summit Cash weekly',balance:'\u2212$2,110'},{date:'Mar 12',amount:'\u2212$430.75',desc:'Payroll run',balance:'\u2212$431'},{date:'Mar 30',amount:'\u2212$1,920.40',desc:'Double debit day',balance:'\u2212$1,920'},{date:'Apr 8',amount:'\u2212$610.00',desc:'Fuel card',balance:'\u2212$610'},{date:'Apr 21',amount:'\u2212$1,355.90',desc:'Apex + Summit same day',balance:'\u2212$1,356'},{date:'May 14',amount:'\u2212$770.30',desc:'Insurance debit',balance:'\u2212$770'},{date:'Jun 2',amount:'\u2212$1,090.10',desc:'ACH timing',balance:'\u2212$1,090'}]:[{date:'Mar 22',amount:'\u2212$210.40',desc:'ACH timing, cured next day',balance:'\u2212$210'}]},
      deposit_count:{title:'Qualifying deposit count',sub:'Only deposits that count toward true monthly revenue',count:flaggedV?38:47,total:flaggedV?'$142,000':'$160,900',negColor:'var(--ok)',
        headerNote:flaggedV?'38 qualifying deposits · Apr 2026':'47 qualifying deposits · May 2026',
        footNote:'Sample of the qualifying deposits — card settlements and customer ACH / checks. Personal transfers, P2P apps, refunds and factoring are excluded (see Step 3). SOP minimum is 3 qualifying deposits / month; fewer than 3 is auto-flagged. This merchant clears it.',
        rows:flaggedV?[{date:'Apr 1',desc:'Freight settlement — Midwest Logistics',channel:'ACH credit ••7712',amount:'$11,200'},{date:'Apr 4',desc:'Load payment — BlueLane Freight',channel:'ACH credit',amount:'$6,400'},{date:'Apr 9',desc:'Broker settlement — TQL',channel:'ACH credit',amount:'$5,950'},{date:'Apr 16',desc:'Load payment — Echo Global',channel:'ACH credit',amount:'$4,820'},{date:'…',desc:'+34 more qualifying deposits',channel:'ACH credits',amount:''}]:[{date:'May 2',desc:'Square daily card payout',channel:'Card settlement',amount:'$4,210'},{date:'May 3',desc:'Toast card payout',channel:'Card settlement',amount:'$3,180'},{date:'May 6',desc:'Customer ACH — Riverside Cafe',channel:'ACH credit ••3310',amount:'$2,640'},{date:'May 9',desc:'Check deposit — Helmsworth Group',channel:'Mobile deposit',amount:'$3,950'},{date:'May 12',desc:'Catering contract — Helmsworth Group',channel:'ACH credit ••4021',amount:'$8,400'},{date:'…',desc:'+42 more qualifying deposits',channel:'Card & ACH credits',amount:''}]},
      avg3mo:{title:'3-month average',sub:'True monthly revenue across the last 3 statements',count:3,total:flaggedV?'$138,900':'$158,420',negColor:'var(--text)',
        footNote:'Average of true monthly revenue (after the Step 3 deductions) across the 3 most recent statements. Deposit count per month is shown here so you can confirm each month clears the 3-deposit minimum.',
        rows:flaggedV?[{m:'Feb 2026',n:'40 deposits',rev:'$148,200'},{m:'Mar 2026',n:'36 deposits',rev:'$136,400'},{m:'Apr 2026',n:'38 deposits',rev:'$142,000'}]:[{m:'Mar 2026',n:'45 deposits',rev:'$152,100'},{m:'Apr 2026',n:'49 deposits',rev:'$162,300'},{m:'May 2026',n:'47 deposits',rev:'$160,900'}]},
      largest:{title:'Largest single deposit',sub:'Biggest qualifying deposit in the focus month',count:1,total:flaggedV?'$11,200':'$8,400',negColor:'var(--ok)',
        headerNote:flaggedV?'1 deposit · 8% of monthly revenue':'1 deposit · 5% of monthly revenue',
        footNote:'A single deposit above 30% of monthly revenue is flagged for concentration risk. This one is well under the threshold.',
        rows:flaggedV?[{date:'Apr 1',desc:'Freight settlement — Midwest Logistics',channel:'ACH credit ••7712',amount:'$11,200'}]:[{date:'May 12',desc:'Catering contract — Helmsworth Group',channel:'ACH credit ••4021',amount:'$8,400'}]},
      retarget:{title:'Re-target funder',sub:'Confirm the merchant industry to find a fit',rows:[]},
    };
    const pd=sp&&popupData[sp];
    const popupRowsResolved=pd?pd.rows.map(r=>({...r})):[];
    const ocrCands=[{amount:'$1,120.00',conf:71,agent:true},{amount:'$11,200.00',conf:22,agent:false}].map(c=>{
      const sel=s.scrubOcrValue===c.amount;
      return {amount:c.amount, confLabel:c.conf+'%', barWidth:c.conf+'%',
        barColor:c.conf>=70?'var(--warn)':'var(--text3)',
        tag:c.agent?'Agent pick':'Alternate', tagStyle:c.agent?'font:500 10px var(--sans);color:var(--warn);background:var(--warn-bg);padding:2px 8px;border-radius:999px':'font:500 10px var(--sans);color:var(--text3);background:var(--surface2);padding:2px 7px;border-radius:5px',
        onClick:()=>this.setState({scrubOcrValue:c.amount}),
        rowStyle:'display:flex;align-items:center;gap:11px;width:100%;text-align:left;padding:12px 13px;border-radius:11px;cursor:pointer;border:1px solid '+(sel?'var(--accent)':'var(--border2)')+';background:'+(sel?'var(--accent-bg)':'var(--surface)')+';transition:all .14s',
        dot:'width:14px;height:14px;border-radius:50%;flex:none;border:2px solid '+(sel?'var(--accent)':'var(--border2)')+';background:'+(sel?'var(--accent)':'transparent')+';box-shadow:'+(sel?'inset 0 0 0 2px var(--surface)':'none')};
    });

    const srcDefs={
      src_step1:{title:'Step 1 · application validation', sub:'Read from the signed application & bank ownership', foot:'Pulled from the application and matched against the bank account holder, IRS letter and Secretary-of-State filing. Edit any field to correct the agent’s read — changes are logged to the deal record.',
        groups: flaggedV?[
          {name:'Identity', fields:[
            {id:'s1_biz',label:'Business name',value:'Lone Star Freight LLC',note:'Application + bank account holder'},
            {id:'s1_owner',label:'Owner',value:'Raymond Cole · 100%',note:'Government ID on file'},
            {id:'s1_ein',label:'EIN / Federal tax ID',value:'82-5530147',note:'IRS CP-575 letter'},
          ]},
          {name:'Business', fields:[
            {id:'s1_start',label:'Business start date',value:'May 3, 2021',note:'TX Secretary of State filing'},
            {id:'s1_tib',label:'Time in business',value:'5.1 years',note:'Derived from start date'},
            {id:'s1_ind',label:'Industry',value:'Trucking',note:'NAICS 484121 · ≥ $200k/mo floor applies'},
          ]},
        ]:[
          {name:'Identity', fields:[
            {id:'s1_biz',label:'Business name',value:'Cinnamon Trail Coffee LLC',note:'Application + bank account holder'},
            {id:'s1_owner',label:'Owner',value:'Dana Whitfield · 100%',note:'Government ID on file'},
            {id:'s1_ein',label:'EIN / Federal tax ID',value:'47-3920184',note:'IRS CP-575 letter'},
          ]},
          {name:'Business', fields:[
            {id:'s1_start',label:'Business start date',value:'Aug 16, 2022',note:'TX Secretary of State filing'},
            {id:'s1_tib',label:'Time in business',value:'3.8 years',note:'Derived from start date'},
            {id:'s1_ind',label:'Industry',value:'Food & Bev',note:'NAICS 722515 · no revenue floor'},
          ]},
        ]},
      src_step2:{title:'Step 2 · default & fraud', sub:'Courts + DataMerch cross-reference', foot:'Live queries against court records (business + owner, last 7 years) and the DataMerch funder database. Edit a field if you have a more recent or corrected record.',
        groups: flaggedV?[
          {name:'Court records', fields:[
            {id:'s2_courts',label:'Judgments / defaults',value:'1 default',note:'Confessed judgment · Velocity Capital · $38k · satisfied Apr 2025'},
            {id:'s2_res',label:'Resolution letter',value:'On file',note:'Satisfied Apr 2025 · clears B/C-paper only'},
          ]},
          {name:'DataMerch', fields:[
            {id:'s2_dm',label:'Funder reports',value:'1 report',note:'Forged docs reported by Apex MCA · Jan 2026'},
            {id:'s2_checked',label:'Last checked',value:'9:42 AM today',note:'Live query'},
          ]},
        ]:[
          {name:'Court records', fields:[
            {id:'s2_courts',label:'Judgments / defaults',value:'0 hits',note:'Business + owner · last 7 years'},
          ]},
          {name:'DataMerch', fields:[
            {id:'s2_dm',label:'Funder reports',value:'0 records',note:'EIN + owner lookup'},
            {id:'s2_checked',label:'Last checked',value:'9:42 AM today',note:'Live query'},
          ]},
        ]},
      src_step3:{title:'Step 3 · true deposit reconciliation', sub:flaggedV?'April 2026 · gross deposits minus SOP exclusions':'May 2026 · gross deposits minus SOP exclusions', foot:'Gross credits from the parsed statements, minus the SOP exclusion list. Open Source on any row to see the documents it was extracted from; edit a value to correct a classification.',
        groups: flaggedV?[
          {name:'Reconciliation', fields:[
            {id:'s3_gross',label:'Gross deposits',value:'$171,300',note:'All credits · April 2026'},
            {id:'s3_transfers',label:'− Personal transfers',value:'−$12,800',note:'3 transactions · R. Cole', txns:[
              {id:'s3_t1',date:'Apr 4',desc:'Transfer from personal savings',value:'−$5,200'},
              {id:'s3_t2',date:'Apr 15',desc:'Transfer from personal savings',value:'−$4,600'},
              {id:'s3_t3',date:'Apr 27',desc:'Transfer from personal checking',value:'−$3,000'},
            ]},
            {id:'s3_p2p',label:'− Zelle / Venmo / PayPal / Cash App',value:'−$9,400',note:'5 transactions · peer-payment apps', txns:[
              {id:'s3_p1',date:'Apr 3',desc:'Zelle from R. Cole',value:'−$2,400'},
              {id:'s3_p2',date:'Apr 9',desc:'Venmo transfer',value:'−$2,100'},
              {id:'s3_p3',date:'Apr 14',desc:'Cash App transfer',value:'−$1,900'},
              {id:'s3_p4',date:'Apr 21',desc:'PayPal transfer',value:'−$1,800'},
              {id:'s3_p5',date:'Apr 28',desc:'Zelle from R. Cole',value:'−$1,200'},
            ]},
            {id:'s3_refunds',label:'− Refunds & returns',value:'−$2,100',note:'2 transactions · ACH reversals', txns:[
              {id:'s3_r1',date:'Apr 11',desc:'ACH reversal — fuel vendor',value:'−$1,300'},
              {id:'s3_r2',date:'Apr 23',desc:'ACH return — duplicate',value:'−$800'},
            ]},
            {id:'s3_factoring',label:'− Factoring / advances',value:'−$5,000',note:'1 transaction · RTS Financial', txns:[
              {id:'s3_f1',date:'Apr 6',desc:'RTS Financial — factoring advance',value:'−$5,000'},
            ]},
            {id:'s3_true',label:'= True monthly revenue',value:'$142,000',note:'Gross minus exclusions',emphasis:true},
          ]},
          {name:'Revenue quality', fields:[
            {id:'s3_count',label:'Qualifying deposit count',value:'38',note:'April · ≥ 3/mo minimum (passes)'},
            {id:'s3_avg',label:'3-month average',value:'$138,900',note:'Feb 40 / Mar 36 / Apr 38 deposits'},
            {id:'s3_largest',label:'Largest single deposit',value:'$11,200',note:'Midwest Logistics · 8% of month'},
            {id:'s3_trend',label:'MoM trend',value:'−9% · declining',note:'vs prior 2 months'},
          ]},
        ]:[
          {name:'Reconciliation', fields:[
            {id:'s3_gross',label:'Gross deposits',value:'$182,400',note:'All credits · May 2026'},
            {id:'s3_transfers',label:'− Personal transfers',value:'−$14,200',note:'3 transactions · D. Whitfield', txns:[
              {id:'s3_t1',date:'May 5',desc:'Transfer from personal savings',value:'−$6,000'},
              {id:'s3_t2',date:'May 16',desc:'Transfer from personal savings',value:'−$5,200'},
              {id:'s3_t3',date:'May 28',desc:'Transfer from personal checking',value:'−$3,000'},
            ]},
            {id:'s3_p2p',label:'− Zelle / Venmo / PayPal / Cash App',value:'−$6,100',note:'4 transactions · peer-payment apps', txns:[
              {id:'s3_p1',date:'May 4',desc:'Zelle from D. Whitfield',value:'−$2,000'},
              {id:'s3_p2',date:'May 12',desc:'Venmo transfer',value:'−$1,700'},
              {id:'s3_p3',date:'May 19',desc:'Cash App transfer',value:'−$1,400'},
              {id:'s3_p4',date:'May 26',desc:'PayPal transfer',value:'−$1,000'},
            ]},
            {id:'s3_refunds',label:'− Refunds & returns',value:'−$1,200',note:'2 transactions · card reversals', txns:[
              {id:'s3_r1',date:'May 9',desc:'Card reversal — POS',value:'−$700'},
              {id:'s3_r2',date:'May 22',desc:'Card refund — customer',value:'−$500'},
            ]},
            {id:'s3_factoring',label:'− Factoring / advances',value:'$0',note:'None detected'},
            {id:'s3_true',label:'= True monthly revenue',value:'$160,900',note:'Gross minus exclusions',emphasis:true},
          ]},
          {name:'Revenue quality', fields:[
            {id:'s3_count',label:'Qualifying deposit count',value:'47',note:'May · ≥ 3/mo minimum (passes)'},
            {id:'s3_avg',label:'3-month average',value:'$158,420',note:'Mar 45 / Apr 49 / May 47 deposits'},
            {id:'s3_largest',label:'Largest single deposit',value:'$8,400',note:'Catering — Helmsworth · 5% of month'},
            {id:'s3_trend',label:'MoM trend',value:'−3% · stable',note:'vs prior 2 months'},
          ]},
        ]},
      src_step4:{title:'Step 4 · recurring debits & positions', sub:'Recurring ACH patterns across 6 months', foot:'Active positions and debit metrics inferred from recurring ACH patterns in the parsed statements. Open Source on any row to see the underlying debit hits; edit a figure to confirm from a payoff letter.',
        groups: flaggedV?[
          {name:'Active positions', fields:[
            {id:'s4_p1',label:'Apex MCA — daily ACH',value:'$540',note:'118 hits since Jan 9', txns:[
              {id:'s4_a1',date:'Apr 1',desc:'Apex MCA — daily ACH',value:'−$540.00'},
              {id:'s4_a2',date:'Apr 2',desc:'Apex MCA — daily ACH',value:'−$540.00'},
              {id:'s4_a3',date:'Apr 3',desc:'Apex MCA — daily ACH',value:'−$540.00'},
              {id:'s4_a4',date:'…',desc:'118 hits since Jan 9',value:''},
            ]},
            {id:'s4_p2',label:'Summit Cash — weekly ACH',value:'$1,650',note:'24 hits since Feb 2', txns:[
              {id:'s4_s1',date:'Apr 1',desc:'Summit Cash — weekly ACH',value:'−$1,650.00'},
              {id:'s4_s2',date:'Apr 8',desc:'Summit Cash — weekly ACH',value:'−$1,650.00'},
              {id:'s4_s3',date:'…',desc:'24 hits since Feb 2',value:''},
            ]},
          ]},
          {name:'Capacity metrics', fields:[
            {id:'s4_daily',label:'Combined daily debit',value:'$870',note:'Sum of active daily-equivalent debits'},
            {id:'s4_hits',label:'Total debit hits / 6 mo',value:'142',note:'Recurring debit transactions'},
            {id:'s4_neg',label:'Negative-balance days',value:'9',note:'SOP limit 5 — FAILS · dated list on file'},
            {id:'s4_withhold',label:'Withhold',value:'22%',note:'Daily debit ÷ avg daily deposits'},
          ]},
        ]:[
          {name:'Active positions', fields:[
            {id:'s4_p1',label:'Forward Line — daily ACH',value:'$318',note:'63 hits since Mar 14', txns:[
              {id:'s4_a1',date:'May 1',desc:'Forward Line — daily ACH',value:'−$318.00'},
              {id:'s4_a2',date:'May 2',desc:'Forward Line — daily ACH',value:'−$318.00'},
              {id:'s4_a3',date:'May 5',desc:'Forward Line — daily ACH',value:'−$318.00'},
              {id:'s4_a4',date:'…',desc:'63 hits since Mar 14',value:''},
            ]},
          ]},
          {name:'Capacity metrics', fields:[
            {id:'s4_daily',label:'Combined daily debit',value:'$318',note:'Sum of active daily-equivalent debits'},
            {id:'s4_hits',label:'Total debit hits / 6 mo',value:'63',note:'Recurring debit transactions'},
            {id:'s4_neg',label:'Negative-balance days',value:'1',note:'Mar 22 · cured next day'},
            {id:'s4_withhold',label:'Withhold',value:'6%',note:'Daily debit ÷ avg daily deposits'},
          ]},
        ]},
    };
    const srcKey = s.srcPanel;
    const srcDef = srcKey && srcDefs[srcKey];
    const ev=(id,fb)=>(s.srcEdits[id]!==undefined?s.srcEdits[id]:fb);
    // RIGHT PANE — editable field list. Whole row selects the field (loads its evidence on the left). No per-row Source button.
    const selField = s.srcPanelField;
    const srcGroups = srcDef ? srcDef.groups.map(g=>({ name:g.name, fields:g.fields.map(f=>{
      const sel=f.id===selField;
      return {
      id:f.id, label:f.label, note:f.note, value:ev(f.id,f.value), onInput:(e)=>this.setSrcEdit(f.id,e.target.value),
      emphasis:!!f.emphasis, selected:sel, onSelect:()=>this.selectSrcField(f.id),
      rowStyle:'display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border);cursor:pointer;border-left:2.5px solid '+(sel?'var(--accent)':'transparent')+';background:'+(sel?'var(--accent-bg)':'transparent')+';transition:background .12s',
      labelStyle:'font-size:12px;font-weight:'+(f.emphasis?'700':'600')+';color:'+(f.emphasis&&!sel?'var(--accent)':'var(--text)'),
      inputStyle:'width:118px;flex:none;border:1px solid '+(sel?'var(--accent)':'var(--border2)')+';border-radius:8px;padding:7px 10px;font:'+(f.emphasis?'700':'600')+' 12.5px var(--mono);color:'+(f.emphasis?'var(--accent)':'var(--text)')+';background:var(--surface);outline:none',
    }; }) })) : [];
    // SOURCING — per-field extraction evidence, read-only, independent of editing.
    const bankFile = flaggedV?'bank_stmt_feb_apr_2026.pdf':'bank_stmt_mar_may_2026.pdf';
    const D=(file,conf,tone,lines)=>({file,conf,tone,
      img: /^bank_stmt/.test(file)?'assets/bank-statement-sample.png':null,
      confStyle:'font:600 11px var(--mono);'+(tone==='warn'?'color:var(--warn)':'color:var(--ok)'),
      cardStyle:'border:1px solid '+(tone==='warn'?'#e7d2ab':'#cfe6d4')+';background:'+(tone==='warn'?'#fdf6ec':'#f3faf5')+';border-radius:12px;padding:13px 15px',
      lines});
    const HL=(label,val)=>({label,val,hl:true,
      valStyle:'background:'+(false?'':'rgba(120,86,209,.13)')+';color:var(--accent);padding:1px 5px;border-radius:4px;font-weight:600'});
    const HW=(label,val)=>({label,val,hl:true,
      valStyle:'background:#fbe3c8;color:#b4540f;padding:1px 5px;border-radius:4px;font-weight:600'});
    const TX=(text)=>({label:text,plain:true});
    const ver=(tone,title,text)=>({tone,title,text,
      iconBg: tone==='warn'?'var(--warn-bg)':tone==='info'?'var(--surface2)':'var(--ok-bg)',
      iconColor: tone==='warn'?'var(--warn)':tone==='info'?'var(--text3)':'var(--ok)',
      titleColor: tone==='warn'?'var(--warn)':tone==='info'?'var(--text2)':'var(--ok)',
      isInfo: tone==='info'});
    const txnDoc=(f)=> D(bankFile,'Parsed from statement','ok',
      f.txns.map(t=> t.value===''? TX('… '+t.desc) : HL(t.date+'  ·  '+t.desc, ev(t.id,t.value)) ));
    const owner=flaggedV?'Raymond Cole':'Dana Whitfield';
    const bizName=flaggedV?'Lone Star Freight LLC':'Cinnamon Trail Coffee LLC';
    const einV=flaggedV?'82-5530147':'47-3920184';
    const srcEvidence = {
      s1_biz:{ docs:[
        D(bankFile,'94% confidence','ok',[HL('Account Holder:', bizName.toUpperCase()), TX('Account #: ••••'+(flaggedV?'8830':'1190')), TX('Bank of America — Business Checking')]),
        D('merchant_application.pdf','98% confidence','ok',[HL('Legal Business Name:', bizName), TX('DBA: '+(flaggedV?'Lone Star Freight':'Cinnamon Trail')), TX('EIN: '+einV)]),
        D('tax_return_2023.pdf','62% confidence — low OCR','warn',[HW('Business Name:', (flaggedV?'Lone St░░ Freight LL░':'Cinnamon Tr░░ Coffee LL░')), TX('⚠ Partial OCR — some characters unreadable')]),
      ], verified: ver('ok','Match verified','Business name consistent across 2 of 3 sources. Tax-return OCR quality is low.') },
      s1_owner:{ docs:[
        D('merchant_application.pdf','98% confidence','ok',[HL('Owner / Principal:', owner+' — 100%'), TX('Title: Managing Member')]),
        D('drivers_license.jpg','95% confidence','ok',[HL('Name:', owner), TX('State: TX · DOB redacted')]),
      ], verified: ver('ok','Match verified','Sole owner confirmed on the application and government ID.') },
      s1_ein:{ docs:[
        D('merchant_application.pdf','98% confidence','ok',[HL('EIN:', einV)]),
        D('irs_cp575.pdf','99% confidence','ok',[HL('Employer ID Number:', einV), TX('Entity: '+bizName)]),
      ], verified: ver('ok','Match verified','EIN matches the application and the IRS CP-575 letter.') },
      s1_start:{ docs:[
        D('sos_filing.pdf','97% confidence','ok',[HL('Date Formed:', flaggedV?'05/03/2021':'08/16/2022'), TX('State: Texas · Status: Active')]),
        D('merchant_application.pdf','90% confidence','ok',[HL('Business start date:', flaggedV?'May 2021':'Aug 2022')]),
      ], verified: ver('ok','Match verified','Formation date confirmed against the Secretary-of-State filing.') },
      s1_tib:{ docs:[ D('— derived field —','computed','info',[TX('today − formation date = '+(flaggedV?'5.1 years':'3.8 years'))]) ],
        verified: ver('info','Derived value','Computed from the formation date — no standalone source document.') },
      s1_ind:{ docs:[
        D('merchant_application.pdf','95% confidence','ok',[HL('Business type:', flaggedV?'Trucking / freight':'Coffee shop / café'), TX('NAICS '+(flaggedV?'484121':'722515'))]),
        D('card_processor_mcc.pdf', flaggedV?'—':'92% confidence', flaggedV?'info':'ok', flaggedV?[TX('No card processor on file (ACH-only)')]:[HL('MCC:', '5814 — Fast Food / Café')]),
      ], verified: flaggedV? ver('warn','Floor applies','Trucking (NAICS 484121) carries the ≥ $200k/mo A-paper revenue floor.') : ver('ok','Match verified','Industry consistent with NAICS 722515 — no revenue floor applies.') },
      s2_courts: flaggedV? { docs:[ D('court_record_velocity.pdf','97% confidence','warn',[HL('Confessed Judgment:', 'Velocity Capital — $38,000'), TX('Filed 2024-02 · '), HL('Status:', 'SATISFIED 2025-04-18')]) ], verified: ver('warn','Prior default','Default on record but satisfied — clears B/C-paper funders only.') }
                          : { docs:[ D('court_search.pdf','99% confidence','ok',[HL('Results:', '0 judgments / 0 defaults'), TX('Scope: business + owner · last 7 years'), TX('Sources: PACER + county records')]) ], verified: ver('ok','Match verified','No judgments or defaults on record.') },
      s2_res:{ docs:[ D('resolution_letter.pdf','98% confidence','ok',[HL('Velocity Capital:', 'Satisfaction & Release'), HL('Satisfied:', 'Apr 18, 2025'), TX('Notary record matched')]) ],
        verified: ver('ok','Match verified','Satisfaction letter on file and verified authentic.') },
      s2_dm: flaggedV? { docs:[ D('datamerch_report.pdf','96% confidence','warn',[HL('Report:', 'Forged-document submission'), HL('Filed by:', 'Apex MCA · Jan 2026'), TX('Against EIN '+einV)]) ], verified: ver('warn','Funder-reported','Document-tampering report on file from a prior submission.') }
                       : { docs:[ D('datamerch_lookup.pdf','99% confidence','ok',[HL('Records:', '0 for '+einV), TX('Owner lookup: '+owner+' — clean')]) ], verified: ver('ok','Match verified','No funder-reported issues in DataMerch.') },
      s2_checked:{ docs:[ D('— live query —','just now','info',[TX('Court + DataMerch queried at 9:42 AM today')]) ], verified: ver('info','Live query','Timestamp of the most recent automated lookup.') },
      s3_gross:{ docs:[ D(bankFile,'99% confidence','ok',[HL('Total deposits:', flaggedV?'$171,300.00':'$182,400.00'), TX('Statement summary line · '+(flaggedV?'Apr 2026':'May 2026'))]) ],
        verified: ver('ok','Match verified','Gross credits read directly from the statement summary.') },
      s3_true:{ docs:[ D('— derived field —','computed','info',[TX('Gross '+(flaggedV?'$171,300':'$182,400')+' − SOP exclusions '+(flaggedV?'$29,300':'$21,500')+' = '+(flaggedV?'$142,000':'$160,900'))]) ],
        verified: ver('info','Derived value','Reconciliation of the deduction rows above — edit any deduction to recompute.') },
      s3_count:{ docs:[ D(bankFile,'98% confidence','ok',[HL('Qualifying credits:', flaggedV?'38':'47'), TX('Card settlements + customer ACH / checks'), TX('SOP minimum: 3 / month')]) ],
        verified: ver('ok','Match verified','Above the 3-deposit monthly minimum.') },
      s3_avg:{ docs:[ D('3 statements','high confidence','ok', flaggedV?[HL('Feb 2026:', '$148,200'),HL('Mar 2026:', '$136,400'),HL('Apr 2026:', '$142,000')]:[HL('Mar 2026:', '$152,100'),HL('Apr 2026:', '$162,300'),HL('May 2026:', '$160,900')]) ],
        verified: ver('ok','Match verified','Average of true revenue across the 3 most recent statements.') },
      s3_largest:{ docs:[ D(bankFile,'99% confidence','ok', flaggedV?[HL('Apr 1 · Midwest Logistics:', '$11,200'), TX('8% of monthly revenue')]:[HL('May 12 · Catering — Helmsworth:', '$8,400'), TX('5% of monthly revenue')]) ],
        verified: ver('ok','Match verified','Under the 30%-of-revenue concentration threshold.') },
      s3_trend:{ docs:[ D('— derived field —','computed','info',[TX('Month-over-month change vs the prior 2 statements: '+(flaggedV?'−9% (declining)':'−3% (stable)'))]) ],
        verified: ver('info','Derived value','Computed from the 3-month series.') },
      s4_daily:{ docs:[ D('— derived field —','computed','info',[TX('Sum of active daily-equivalent debits = '+(flaggedV?'$870':'$318'))]) ],
        verified: ver('info','Derived value','Aggregated from the active positions above.') },
      s4_hits:{ docs:[ D(bankFile,'97% confidence','ok',[HL('Recurring debit transactions:', flaggedV?'142':'63'), TX('Pattern-matched across 6 months')]) ],
        verified: ver('ok','Match verified','Count of recurring loan/advance debits.') },
      s4_neg: flaggedV? { docs:[ D(bankFile,'98% confidence','warn',[HL('Negative-balance days:', '9'), TX('SOP limit: 5 — FAILS'), TX('Dated list attached to the scrub')]) ], verified: ver('warn','Over SOP limit','9 negative days exceeds the 5-day SOP threshold.') }
                        : { docs:[ D(bankFile,'98% confidence','ok',[HL('Negative-balance days:', '1'), TX('Mar 22 · cured next day')]) ], verified: ver('ok','Match verified','Within the 5-day SOP threshold.') },
      s4_withhold:{ docs:[ D('— derived field —','computed','info',[TX('Combined daily debit ÷ avg daily deposits = '+(flaggedV?'22%':'6%'))]) ],
        verified: ver('info','Derived value','Computed from daily debit and average daily deposits.') },
    };
    const fallbackEvidence=(f)=>({ docs:[ D((f.note||'parsed document'),'high confidence','ok',[HL(f.label.replace(/^[−=]\s*/,'')+':', ev(f.id,f.value))]) ], verified: ver('ok','Single source','Extracted from '+(f.note||'the parsed document')+'.') });
    const evidenceFor=(fd)=>{
      const val=ev(fd.id, fd.value);
      const evd = srcEvidence[fd.id] || (fd.txns ? { docs:[txnDoc(fd)], verified: ver('ok','Reconciled', fd.txns.filter(t=>t.value!=='').length+' transactions classified per SOP, summing to '+val+'.') } : fallbackEvidence(fd));
      return { field:fd.label.replace(/^[−=]\s*/,''), value:val,
        intro:'AI extracted “'+val+'” from the following source'+(evd.docs.length>1?'s':'')+':',
        docs:evd.docs, verified:evd.verified };
    };
    let srcPanelView=null, srcSelLabel='';
    if(srcDef && selField){
      let fd=null; srcDef.groups.forEach(g=>g.fields.forEach(f=>{ if(f.id===selField) fd=f; }));
      if(fd){ srcPanelView=evidenceFor(fd); srcSelLabel=fd.label.replace(/^[−=]\s*/,''); }
    }
    const srcSplit = s.srcSplit||0.54;
    const popupWidth = 600;

    // uw blocks mapping
    const dot=(sig)=>sig==='pos'?'var(--ok)':sig==='neg'?'var(--bad)':'var(--text3)';
    const lastUw=s.uwThread.map((b,i)=>b.kind==='underwriting'?i:-1).reduce((a,b)=>Math.max(a,b),-1);
    const rationale=[
      {label:'Revenue consistency',value:'Strong · low variance',dot:dot('pos')},
      {label:'Avg daily balance',value:'$22,450 · adequate',dot:dot('neu')},
      {label:'NSF frequency',value:'4 total · 3 in March',dot:dot('neg')},
      {label:'Active positions',value:'2 stacked',dot:dot('neu')},
      {label:'Deposit regularity',value:'62/mo · consistent',dot:dot('pos')},
    ];
    const sevStyle=(sev)=>{ const c=sev==='High'?['var(--bad)','var(--bad-bg)']:['var(--warn)','var(--warn-bg)']; return 'font:500 10px var(--sans);color:'+c[0]+';background:'+c[1]+';padding:2px 8px;border-radius:5px;flex:none;margin-top:1px;text-transform:uppercase;letter-spacing:.03em'; };
    const mkFlags=(r)=>{ const f=[
      {t:'NSF concentration',d:'3 of 4 NSFs fall in March 2026 — consistent with a seasonal cash dip, not chronic.',sev:'Medium'},
      {t:'Stacked positions',d:'2 active advances; combined daily debit reaches '+r.debit+'% of average daily deposits.',sev:'Medium'},
    ]; if(r.extra) f.push({t:'Exposure',d:r.extra,sev:'High'}); return f.map(x=>({...x,sevStyle:sevStyle(x.sev)})); };
    const confColor=(c)=>c>=85?'var(--ok)':c>=72?'var(--warn)':'var(--bad)';
    const itemMark=(st)=>({mark:st==='pass'?'\u2713':st==='warn'?'!':'\u2715', markStyle:'width:19px;height:19px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:600 11px var(--sans);flex:none;color:'+(st==='pass'?'var(--ok)':st==='warn'?'var(--warn)':'var(--bad)')+';background:'+(st==='pass'?'var(--ok-bg)':st==='warn'?'var(--warn-bg)':'var(--bad-bg)')});
    const uwBlocks=s.uwThread.map((b,i)=>{
      const o={...b,isUser:b.kind==='user',isAgentText:b.kind==='agentText',isDocParse:b.kind==='docParse',isInfoCollect:b.kind==='infoCollect',isScorecard:b.kind==='scorecard',isUnderwriting:b.kind==='underwriting',isDecision:b.kind==='decision',isHealth:b.kind==='health'};
      if(b.kind==='health'){
        const sevMap={review:['#6c47e0','#eeebfd','Review'],warn:['#c55a11','#fff3e4','Caution'],bad:['#d42c2c','#fde8e8','Blocker']};
        const rawIssues=[
          {id:'ocr',sev:'review',icon:'⌕',title:'Low OCR confidence',desc:'March statement, p.3 — total-deposits line extracted at 71% on a smudged scan. Every other field cleared 95%+.',actionLabel:'Review file manually'},
          {id:'nsf',sev:'warn',icon:'!',title:'NSF concentration',desc:'3 of 4 NSFs cluster in March 2026 — worth confirming it\u2019s seasonal, not a pattern.',actionLabel:'Explain in context'},
          {id:'stack',sev:'warn',icon:'≡',title:'Possible stacked positions',desc:'Recurring ACH debits suggest 2 active advances. Confirm combined exposure before approving.',actionLabel:'Run stacking analysis'},
        ];
        const handlers={ocr:this.openManualReview,nsf:this.healthExplainNsf,stack:this.healthStacking};
        const resolvedLbl={ocr:'Verified',nsf:'Reviewed',stack:'Analyzed'};
        const issues=rawIssues.map((it,idx)=>{
          const resolved=s.healthResolved.includes(it.id);
          const sv=sevMap[it.sev];
          return {
            title:it.title, desc:it.desc, icon:resolved?'\u2713':it.icon,
            sevLabel:sv[2], resolved, resolvedLabel:resolvedLbl[it.id], actionable:!resolved,
            actionLabel:it.actionLabel, onClick:handlers[it.id],
            rowStyle:'display:flex;align-items:flex-start;gap:13px;padding:15px 20px;'+(idx<rawIssues.length-1?'border-bottom:1px solid var(--border);':'')+(resolved?'opacity:.72;':''),
            iconWrap:'width:26px;height:26px;border-radius:7px;flex:none;display:flex;align-items:center;justify-content:center;font:700 13px var(--mono);margin-top:1px;'+(resolved?'background:var(--ok-bg);color:var(--ok)':'background:'+sv[1]+';color:'+sv[0]),
            sevStyle:'font:600 9.5px var(--sans);text-transform:uppercase;letter-spacing:.06em;color:'+sv[0]+';background:'+sv[1]+';padding:2px 8px;border-radius:999px',
            btnStyle:'display:flex;align-items:center;gap:6px;flex:none;border:1px solid '+sv[0]+';background:'+sv[1]+';color:'+sv[0]+';padding:8px 13px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .14s;white-space:nowrap',
          };
        });
        const open=issues.filter(x=>!x.resolved).length;
        const penalties={ocr:11,nsf:7,stack:6};
        let pct=100; rawIssues.forEach(it=>{ if(!s.healthResolved.includes(it.id)) pct-=penalties[it.id]; });
        o.healthPct=pct+'%'; o.healthWidth=pct+'%';
        o.healthColor= pct>=92?'var(--ok)' : pct>=80?'#c55a11' : '#d42c2c';
        o.issues=issues;
        o.statusLabel=open===0?'All clear':open+(open===1?' issue needs attention':' issues need attention');
        o.statusStyle=open===0?'font:500 11px var(--sans);color:var(--ok);background:var(--ok-bg);padding:3px 10px;border-radius:999px;display:flex;align-items:center;gap:6px':'font:500 11px var(--sans);color:#c55a11;background:#fff3e4;padding:4px 10px;border-radius:7px';
      }
      if(b.kind==='infoCollect'){ o.items=b.items.map(it=>({...it,...itemMark(it.s)})); }
      if(b.kind==='scorecard'){ o.criteria=b.criteria.map(c=>({...c,...itemMark(c.s)})); }
      if(b.kind==='underwriting'||b.kind==='decision'){
        const r=b.rec;
        const adjForBlock = (b.kind==='underwriting' && i===lastUw && !s.decided) ? s.factorAdj : (b.adj||0);
        const effFactor = +(r.factor + adjForBlock).toFixed(2);
        const effPayback = r.amount * effFactor;
        const effDaily = Math.round(effPayback / Math.round(r.term*21.7));
        o.amountFmt=this.fmtMoney(r.amount);
        o.baseFactorFmt=r.factor.toFixed(2);
        o.factorFmt=effFactor.toFixed(2);
        o.factorAdjusted = Math.abs(adjForBlock)>0.001;
        o.factorAdjLabel = (adjForBlock>0?'+':'') + adjForBlock.toFixed(2);
        o.termFmt=r.term+' months';
        o.dailyFmt=this.fmtMoney(effDaily);
        o.confPct=r.conf+'%'; o.confWidth=r.conf+'%'; o.confColor=confColor(r.conf);
        o.decisionLabel=r.decision; o.rationale=rationale; o.riskFlags=mkFlags(r);
        o.isLiveUw=(b.kind==='underwriting' && i===lastUw && !s.decided);
      }
      return o;
    });

    // audit metadata for the underwriting card
    const auditMeta='Extraction v3.2.1 \u00b7 Underwriting model 2026.06 \u00b7 every input, adjustment, and approval logged against Diana K.';

    // scenario buttons
    const scenarioButtons=[45000,60000,75000].map(a=>({
      amount:a, label:'$'+(a/1000)+'k', recommended:a===60000, active:a===s.scenario, onClick:()=>this.setScenario(a),
      style:'border:1px solid '+(a===s.scenario?'var(--accent)':'var(--border2)')+';background:'+(a===s.scenario?'var(--accent)':'var(--surface)')+';color:'+(a===s.scenario?'#fff':'var(--text2)')+';padding:6px 13px;border-radius:8px;font:500 12px var(--mono);cursor:pointer;transition:all .12s',
    }));

    const uwSug=(label,q)=>({label,onClick:()=>this.askUw(q)});
    const uwSuggestions=[
      uwSug('What if I cap it at $45,000?','What happens if I cap the advance at $45,000?'),
      uwSug('Explain the NSF flag','Explain the NSF flag in detail'),
      uwSug('Stress at $75,000','Model the deal at $75,000'),
    ];

    const documents=[{name:'Application.pdf'},{name:'BankStmt_Feb2026.pdf'},{name:'BankStmt_Mar2026.pdf'},{name:'BankStmt_Apr2026.pdf'},{name:'BankStmt_May2026.pdf'},{name:'VoidedCheck.jpg'}];
    const tdot=(k)=>'width:9px;height:9px;border-radius:50%;flex:none;margin-top:3px;background:'+(k==='now'?'var(--accent)':'var(--ok)')+(k==='now'?';box-shadow:0 0 0 4px var(--accent-bg)':'');
    const timeline=[
      {text:'Documents received & parsed',time:'9:12 AM',k:'done'},
      {text:'Scrubbed against Pinnacle criteria',time:'9:13 AM',k:'done'},
      {text:'Voided check verified',time:'9:20 AM',k:'done'},
      {text:s.decided?'Decision logged & synced':'Awaiting your decision',time:s.decided?'Just now':'Now',k:s.decided?'done':'now'},
    ].map(t=>({...t,dotStyle:tdot(t.k)}));

    const docFields=[
      {k:'Avg monthly revenue',v:'$148,200'},{k:'Avg daily balance',v:'$22,450'},{k:'Deposits / month',v:'62'},
      {k:'NSFs (4 mo)',v:'4'},{k:'Negative days',v:'2'},{k:'Active positions',v:'2'},
    ];

    // ===== MARCUS: scrubbing workspace =====
    const scrubFields=[
      {k:'Avg monthly revenue',v:'$82,400'},{k:'Avg daily balance',v:'$11,200'},{k:'Deposits / month',v:'41'},
      {k:'NSFs (4 mo)',v:'2'},{k:'Negative days',v:'1'},{k:'Active positions',v:'1'},
    ];
    const scrubCriteria=[
      {c:'Min monthly revenue \u2265 $40k',s:'pass',n:'$82.4k'},
      {c:'Time in business \u2265 2 yrs',s:'pass',n:'3.8 yrs'},
      {c:'Active positions \u2264 4',s:'pass',n:'1'},
      {c:'NSFs \u2264 6 / 4mo',s:'pass',n:'2'},
      {c:'Industry permitted',s:'pass',n:'Food svc'},
      {c:'Avg daily balance \u2265 $10k',s:'pass',n:'$11.2k'},
      {c:'Most-recent month statement',s:'warn',n:'June missing'},
    ];
    const flagged = s.scrubVariant==='flagged';
    const valCol=(st)=>st==='pass'?'var(--ok)':st==='warn'?'var(--warn)':'var(--bad)';
    // feedback footer helper
    const fbBarStyle='display:flex;align-items:center;gap:8px;padding:9px 20px;border-top:1px solid var(--border);background:var(--surface)';
    const fbBtn=(active,kind)=>'width:26px;height:26px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .14s;border:1px solid '+(active?(kind==='up'?'var(--ok)':'var(--bad)'):'var(--border2)')+';background:'+(active?(kind==='up'?'var(--ok-bg)':'var(--bad-bg)'):'var(--surface)')+';color:'+(active?(kind==='up'?'var(--ok)':'var(--bad)'):'var(--text3)')+'';
    const fbProps=(id)=>{ const st=s.scrubFeedback[id]; return {
      fbBar:fbBarStyle, fbUp:()=>this.setScrubFeedback(id,'up'), fbDown:()=>this.setScrubFeedback(id,'down'),
      fbUpStyle:fbBtn(st==='up','up'), fbDownStyle:fbBtn(st==='down','down'),
      fbNote: st==='up'?'Marked accurate':st==='down'?'Flagged for review':null };
    };

    const scrubBlocks=s.scrubThread.map(b=>{
      const o={...b,isUser:b.kind==='user',isAgentText:b.kind==='agentText',
        isDocParseM:b.kind==='docParseM',isInfoCollectM:b.kind==='infoCollectM',
        isScrubcardM:b.kind==='scrubcardM',isScrubDecision:b.kind==='scrubDecision',
        isAppCheck:b.kind==='appCheck',isDefaultCheck:b.kind==='defaultCheck',
        isTrueDeposits:b.kind==='trueDeposits',isRecurringDebits:b.kind==='recurringDebits',
        isDeclineRules:b.kind==='declineRules',isHealth:b.kind==='health'};

      if(b.kind==='health'){
        const sevMap={ok:['#15803d','var(--ok-bg)','Clear'],review:['#6c47e0','#eeebfd','Review'],warn:['#c55a11','#fff3e4','Caution'],bad:['#d42c2c','#fde8e8','Blocker']};
        const rawIssues=flagged?[
          {id:'forged',sev:'bad',icon:'!',title:'DataMerch: forged-document report',desc:'Bank statements altered before a prior submission to Apex MCA. The deposits figure shows a font mismatch and the balance doesn\u2019t reconcile.',actionLabel:'Review flagged statements'},
          {id:'floor',sev:'warn',icon:'$',title:'Below trucking revenue floor',desc:'Trucking/construction needs \u2265$200k in the most recent month. This merchant did $142k \u2014 short of the A-paper minimum.',actionLabel:'Re-target funder'},
          {id:'default',sev:'review',icon:'\u00a7',title:'Prior default within 24 months',desc:'Confessed judgment 14 months ago, satisfied Apr 2025. A resolution letter is on file and may clear B/C-paper funders.',actionLabel:'View resolution letter'},
          {id:'ocr',sev:'warn',icon:'!',title:'Avg daily balance \u2014 low-confidence read',desc:'The Apr statement page was smudged; the Document Parsing Agent\u2019s read of average daily balance is low confidence (71%). Verify the value before submission.',actionLabel:'Manual review'},
        ]:[
          {id:'identity',sev:'ok',icon:'\u2713',title:'Identity & ownership verified',desc:'Business name, sole owner, EIN and 3.8-yr time-in-business all match across the application and bank records.',clear:true},
          {id:'background',sev:'ok',icon:'\u2713',title:'No defaults, judgments or fraud reports',desc:'Courts and DataMerch both clean \u2014 no prior MCA defaults, no tampering on the statements.',clear:true},
          {id:'revenue',sev:'ok',icon:'\u2713',title:'True revenue supports the ask',desc:'$148k/mo average true deposits after transfers and P2P \u2014 comfortably above the Food & Bev floor with no industry cap.',clear:true},
          {id:'ocr',sev:'warn',icon:'!',title:'Avg daily balance \u2014 low-confidence read',desc:'The April statement page was smudged; the Document Parsing Agent\u2019s read of this figure is low confidence (71%). Verify the value before submission.',actionLabel:'Manual review'},
          {id:'recency',sev:'warn',icon:'!',title:'June 2026 statement outstanding',desc:'Forward Line weighs the most-recent month for trend confirmation. June isn\u2019t in yet \u2014 MTD is missing.',actionLabel:'Request June statement'},
        ];
        const handlers=flagged?{forged:this.openForgedReview,floor:this.openRetarget,default:this.scrubHealthResolution,ocr:this.openScrubOcr}:{recency:this.scrubHealthRequestJune,ocr:this.openScrubOcr};
        const resolvedLbl=flagged?{forged:'Flagged',floor:'Re-targeted',default:'Reviewed',ocr:'Verified'}:{recency:'Requested',ocr:'Verified'};
        const isResolved=(it)=>it.clear?true:(it.id==='ocr'?s.scrubOcrResolved:s.scrubHealthResolved.includes(it.id));
        const issues=rawIssues.map((it,idx)=>{
          const resolved=isResolved(it);
          const sv=sevMap[it.sev];
          return { title:it.title, desc:it.desc, icon:resolved?'\u2713':it.icon,
            sevLabel:sv[2], resolved, resolvedLabel:it.clear?'Clear':resolvedLbl[it.id], actionable:!resolved,
            actionLabel:it.actionLabel, onClick:handlers[it.id],
            rowStyle:'display:flex;align-items:flex-start;gap:13px;padding:15px 20px;'+(idx<rawIssues.length-1?'border-bottom:1px solid var(--border);':'')+(resolved&&!it.clear?'opacity:.72;':''),
            iconWrap:'width:26px;height:26px;border-radius:7px;flex:none;display:flex;align-items:center;justify-content:center;font:700 13px var(--mono);margin-top:1px;'+(resolved?'background:var(--ok-bg);color:var(--ok)':'background:'+sv[1]+';color:'+sv[0]),
            sevStyle:'font:600 9.5px var(--sans);text-transform:uppercase;letter-spacing:.06em;color:'+sv[0]+';background:'+sv[1]+';padding:2px 8px;border-radius:999px',
            btnStyle:'display:flex;align-items:center;gap:6px;flex:none;border:1px solid '+sv[0]+';background:'+sv[1]+';color:'+sv[0]+';padding:8px 13px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .14s;white-space:nowrap' };
        });
        const open=issues.filter(x=>!x.resolved).length;
        const penalties=flagged?{forged:34,floor:18,default:9,ocr:5}:{recency:6,ocr:5};
        let pct=100; rawIssues.forEach(it=>{ if(!it.clear && penalties[it.id] && !isResolved(it)) pct-=penalties[it.id]; });
        o.healthPct=pct+'%'; o.healthWidth=pct+'%';
        o.healthColor= pct>=80?'var(--ok)' : pct>=55?'#c55a11' : '#d42c2c';
        o.issues=issues;
        if(flagged){
          o.statusLabel=open===0?'Cleared what we can':open+(open===1?' blocker':' blockers');
          o.statusStyle=open===0?'font:500 11px var(--sans);color:var(--ok);background:var(--ok-bg);padding:3px 10px;border-radius:999px':'font:500 11px var(--sans);color:var(--bad);background:var(--bad-bg);padding:3px 10px;border-radius:999px';
        } else {
          o.statusLabel=open===0?'Ready to send':open+(open===1?' item to chase':' items to chase');
          o.statusStyle=open===0?'font:500 11px var(--sans);color:var(--ok);background:var(--ok-bg);padding:3px 10px;border-radius:999px':'font:500 11px var(--sans);color:var(--warn);background:var(--warn-bg);padding:3px 10px;border-radius:999px';
        }
        o.summaryHeading='Agent summary'; o.summaryShareLabel='Copy summary'; o.shareSummary=this.shareScrubSummary;
        o.summaryPoints=flagged?[
          'Trucking revenue floor fails — $142k vs the $200k A-paper minimum.',
          'Prior default 14 months ago; resolution letter on file (clears B/C-paper only).',
          'DataMerch forged-document report — statements altered before a prior submission.',
          '9 negative-balance days (SOP limit 5) and 2 active positions.',
          'Recommend decline as-submitted, or escalate to B/C-paper after re-verifying statements from source.',
        ]:[
          'Identity, ownership & 3.8-yr time-in-business all verified against bank records.',
          'No defaults, judgments or fraud reports — Courts and DataMerch both clean.',
          'True monthly revenue $160,900 (3-mo avg $158,420), stable at −3% MoM.',
          'One active position; combined withhold 6% — well inside funder limits.',
          'Only open item: June 2026 statement for Forward Line’s recency check.',
        ];
        o.healthManualReview=this.openScrubOcr;
        o.exportOpen=!!s.healthExportOpen; o.toggleExport=this.toggleHealthExport; o.closeExport=this.closeHealthExport;
        o.exportOpts=[{name:'WhatsApp',badge:'Wa'},{name:'LendSaaS',badge:'Ls'},{name:'HubSpot',badge:'Hs'},{name:'Download PDF',badge:'\u2193'}].map(x=>({...x,onClick:()=>this.exportScrubbed(x.name)}));
        const uwAuto=this.autonomyOf('underwriting'); const uwActive=uwAuto==='Automate'||uwAuto==='Confirm';
        o.uwActive=uwActive; o.uwInactive=!uwActive;
        o.uwHint=uwActive?('Underwriting Agent is on '+uwAuto+' \u2014 it will pick up the scrubbed file and run a first-pass underwrite.'):'Underwriting Agent is on Suggest \u2014 underwrite this file manually, or raise the agent\u2019s autonomy to hand it off.';
        o.sendToUw=this.sendToUnderwriter; o.manualUw=this.manualUnderwrite;
      }

      if(b.kind==='infoCollectM'){
        const items=(flagged?[
          {label:'Application',s:'pass',d:'Submitted via WhatsApp \u00b7 verified'},
          {label:'Bank statements',s:'warn',d:'6 received \u00b7 2 flagged for tampering'},
          {label:'Voided check',s:'pass',d:'On file'},
          {label:'Resolution letter',s:'pass',d:'Velocity Capital \u00b7 satisfied Apr 2025'},
        ]:[
          {label:'Application',s:'pass',d:'Submitted via WhatsApp \u00b7 verified'},
          {label:'Bank statements',s:'pass',d:'3 / 3 received \u00b7 Mar\u2013May 2026'},
          {label:'June 2026 statement',s:'warn',d:'Not yet received \u00b7 MTD missing'},
          {label:'Voided check',s:'pass',d:'On file'},
        ]).map(it=>({...it,...itemMark(it.s)}));
        o.items=items;
        o.openChipLabel=flagged?'2 flagged':'1 item open';
        o.openChipStyle='font:500 11px var(--sans);color:var(--warn);background:var(--warn-bg);padding:2px 9px;border-radius:999px';
        Object.assign(o, fbProps('intake'));
      }

      if(b.kind==='scrubcardM'){ o.criteria=scrubCriteria.map(c=>({...c,...itemMark(c.s)})); o.live=!s.scrubDecided; }

      if(b.kind==='docParseM'){
        const resolved=s.scrubOcrResolved;
        o.parseFields=scrubFields.map(f=>{
          const low=f.k==='Avg daily balance';
          if(low && !resolved) return {...f, conf:'71% read', confStyle:'font:500 10px var(--sans);color:var(--warn);background:var(--warn-bg);padding:1px 7px;border-radius:999px;margin-left:7px', vColor:'var(--warn)'};
          if(low && resolved) return {...f, conf:'Verified', confStyle:'font:500 10px var(--sans);color:var(--ok);background:var(--ok-bg);padding:1px 7px;border-radius:999px;margin-left:7px', vColor:'var(--text)'};
          return {...f, conf:'', confStyle:'display:none', vColor:'var(--text)'};
        });
        o.parseNeedsReview=!resolved;
        o.parsePct=resolved?'98.9% extraction':'1 field · low confidence';
        o.parseChipStyle=resolved?'font:500 11px var(--sans);color:var(--ok);background:var(--ok-bg);padding:2px 8px;border-radius:999px':'font:500 11px var(--sans);color:var(--warn);background:var(--warn-bg);padding:2px 9px;border-radius:999px';
        o.openOcr=this.openScrubOcr;
      }

      if(b.kind==='appCheck'){
        const fields=(flagged?[
          {s:'pass',k:'Business name',v:'Lone Star Freight LLC',rule:'Matches application + bank ownership'},
          {s:'pass',k:'Owner',v:'Raymond Cole \u00b7 100%',rule:'Single owner \u00b7 ID on file'},
          {s:'pass',k:'EIN / Federal tax ID',v:'82-5530147',rule:'9 digits \u2713'},
          {s:'pass',k:'Business start date',v:'May 3, 2021',rule:'SOS filing'},
          {s:'pass',k:'Time in business',v:'5.1 years',rule:'\u2265 1 yr required'},
          {s:'fail',k:'Industry revenue floor',v:'Trucking \u00b7 $142k/mo',rule:'Needs \u2265 $200k \u2014 short by $58k'},
        ]:[
          {s:'pass',k:'Business name',v:'Cinnamon Trail Coffee LLC',rule:'Matches application + bank ownership'},
          {s:'pass',k:'Owner',v:'Dana Whitfield \u00b7 100%',rule:'Single owner \u00b7 ID on file'},
          {s:'pass',k:'EIN / Federal tax ID',v:'47-3920184',rule:'9 digits \u2713'},
          {s:'pass',k:'Business start date',v:'Aug 16, 2022',rule:'SOS filing'},
          {s:'pass',k:'Time in business',v:'3.8 years',rule:'\u2265 1 yr required'},
          {s:'pass',k:'Industry rule',v:'Food & Bev',rule:'No trucking/construction floor'},
        ]).map(f=>({...f,...itemMark(f.s),vColor:f.s==='fail'?'var(--bad)':'var(--text)'}));
        o.fields=fields;
        o.hasFloorFail=flagged; o.retargetFunder=this.openRetarget;
        o.statusLabel=flagged?'1 gate fails':'6 / 6 fields pass';
        o.statusStyle=flagged?'font:500 11px var(--sans);color:var(--bad);background:var(--bad-bg);padding:2px 9px;border-radius:999px':'font:500 11px var(--sans);color:var(--ok);background:var(--ok-bg);padding:2px 8px;border-radius:999px';
        o.openSrc=()=>this.openSrcPanel('src_step1','s1_biz');
        Object.assign(o, fbProps('step1'));
      }

      if(b.kind==='defaultCheck'){
        o.hasDefault=flagged; o.hasForged=flagged;
        o.bizName=flagged?'Lone Star Freight LLC':'Cinnamon Trail Coffee LLC';
        o.ownerName=flagged?'Raymond Cole':'Dana Whitfield';
        o.ein=flagged?'82-5530147':'47-3920184';
        o.courtChipLabel=flagged?'1 default':'0 hits';
        o.courtChip='font:500 10px var(--mono);color:'+(flagged?'var(--warn)':'var(--ok)')+';background:'+(flagged?'var(--warn-bg)':'var(--ok-bg)')+';padding:1px 6px;border-radius:4px';
        o.dmChipLabel=flagged?'1 report':'0 records';
        o.dmChip='font:500 10px var(--mono);color:'+(flagged?'var(--bad)':'var(--ok)')+';background:'+(flagged?'var(--bad-bg)':'var(--ok-bg)')+';padding:1px 6px;border-radius:4px';
        o.dcStatusLabel=flagged?'Fraud flag \u00b7 default on record':'Clean \u00b7 both sources';
        o.dcStatusStyle=flagged?'font:500 11px var(--sans);color:var(--bad);background:var(--bad-bg);padding:2px 9px;border-radius:999px':'font:500 11px var(--sans);color:var(--ok);background:var(--ok-bg);padding:2px 8px;border-radius:999px';
        o.viewResolution=this.scrubHealthResolution; o.reviewForged=this.openForgedReview;
        if(flagged){ o.dcBanner='padding:11px 16px;background:var(--bad-bg);font-size:12px;color:var(--bad);display:flex;align-items:center;gap:8px;border-top:1px solid var(--border)'; o.dcBannerIcon=React.createElement('path',{d:'M12 9v4m0 4h.01M10.3 4.3 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z'}); o.dcBannerText='Forgery report is a hard stop. The resolution letter clears the default for B/C-paper, but statements must be re-verified from source first.'; }
        else { o.dcBanner='padding:11px 16px;background:var(--ok-bg);font-size:12px;color:#14532d;display:flex;align-items:center;gap:8px;border-top:1px solid var(--border)'; o.dcBannerIcon=React.createElement('path',{d:'M20 6 9 17l-5-5'}); o.dcBannerText='Cross-referenced \u2014 no judgments, defaults, or fraud reports. Evidence saved to deal record.'; }
        o.openSrc=()=>this.openSrcPanel('src_step2','s2_courts');
        Object.assign(o, fbProps('step2'));
      }

      if(b.kind==='trueDeposits'){
        const ln=(sign,label,amount,note,kind,popup)=>({sign,label,amount,note,clickable:false,
          onClick:null,
          rowStyle:'display:flex;align-items:center;padding:10px 20px;'+(kind==='total'?'background:#fafaf9;border-top:1px solid var(--border2);':'border-bottom:1px solid var(--border);'),
          labelColor:kind==='gross'||kind==='total'?'var(--text)':'var(--text2)',
          labelWeight:kind==='gross'||kind==='total'?'600':'500',
          amountColor:kind==='neg'?'var(--bad)':kind==='zero'?'var(--text3)':'var(--text)'});
        if(flagged){
          o.tdSub='April 2026 \u00b7 figures pending statement re-verification';
          o.tdTotal='$142,000'; o.tdCount='38'; o.tdCountFlag=React.createElement('span',{style:{color:'var(--ok)'}},'(\u22655 \u2713)');
          o.td3mo='$138,900'; o.tdLargest='$11,200'; o.tdTrend='\u22129% \u00b7 declining'; o.tdTrendColor='var(--warn)';
          o.lines=[
            ln('','Gross deposits','$171,300','','gross'),
            ln('\u2212','Transfers from personal accounts','\u2212$12,800','3 transactions','neg','deposit_transfers'),
            ln('\u2212','Zelle / Venmo / PayPal / Cash App','\u2212$9,400','5 transactions','neg','deposit_p2p'),
            ln('\u2212','Refunds & purchase returns','\u2212$2,100','2 transactions','neg','deposit_refunds'),
            ln('\u2212','Factoring / advance payments','\u2212$5,000','1 transaction','neg','deposit_factoring'),
            ln('=','True monthly deposits','$142,000','','total'),
          ];
        } else {
          o.tdSub='May 2026 focus \u00b7 Mar & Apr cross-referenced for recurring patterns';
          o.tdTotal='$160,900'; o.tdCount='47'; o.tdCountFlag=React.createElement('span',{style:{color:'var(--ok)'}},'(\u22655 \u2713)');
          o.td3mo='$158,420'; o.tdLargest='$8,400'; o.tdTrend='\u22123% \u00b7 stable'; o.tdTrendColor='var(--ok)';
          o.lines=[
            ln('','Gross deposits','$182,400','','gross'),
            ln('\u2212','Transfers from personal accounts','\u2212$14,200','3 transactions','neg','deposit_transfers'),
            ln('\u2212','Zelle / Venmo / PayPal / Cash App','\u2212$6,100','4 transactions','neg','deposit_p2p'),
            ln('\u2212','Refunds & purchase returns','\u2212$1,200','2 transactions','neg','deposit_refunds'),
            ln('\u2212','Factoring / advance payments','$0','No factoring detected','zero'),
            ln('=','True monthly deposits','$160,900','','total'),
          ];
        }
        o.openSrc=()=>this.openSrcPanel('src_step3','s3_gross');
        o.openDepCount=()=>this.openScrubPopup('deposit_count');
        o.openAvg3mo=()=>this.openScrubPopup('avg3mo');
        o.openLargest=()=>this.openScrubPopup('largest');
        Object.assign(o, fbProps('step3'));
      }

      if(b.kind==='recurringDebits'){
        if(flagged){
          o.positions=[
            {funder:'Apex MCA',freq:'Daily ACH',amount:'$540',hits:'118',from:'Jan 9'},
            {funder:'Summit Cash',freq:'Weekly ACH',amount:'$1,650',hits:'24',from:'Feb 2'},
          ];
          o.posChipLabel='2 active positions'; o.posChipStyle='font:500 11px var(--sans);color:var(--bad);background:var(--bad-bg);padding:2px 9px;border-radius:999px';
          o.dailyDebit='$870'; o.totalHits='142'; o.negDays='9'; o.negColor='var(--bad)';
          o.holdback='22%'; o.holdbackColor='var(--warn)';
        } else {
          o.positions=[ {funder:'Forward Line',freq:'Daily ACH',amount:'$318',hits:'63',from:'Mar 14'} ];
          o.posChipLabel='1 active position'; o.posChipStyle='font:500 11px var(--sans);color:var(--warn);background:var(--warn-bg);padding:2px 9px;border-radius:999px';
          o.dailyDebit='$318'; o.totalHits='63'; o.negDays='1'; o.negColor='var(--ok)';
          o.holdback='6%'; o.holdbackColor='var(--ok)';
        }
        o.viewNegDays=()=>this.openScrubPopup('negdays');
        o.openSrc=()=>this.openSrcPanel('src_step4','s4_p1');
        Object.assign(o, fbProps('step4'));
      }

      if(b.kind==='declineRules'){
        const rules=flagged?[
          {s:'pass',c:'Negative-balance days \u2264 5',n:'9 days'},
          {s:'fail',c:'Negative-balance days \u2264 5',n:'9 \u00b7 FAIL'},
          {s:'pass',c:'Withhold \u2264 30%',n:'22%'},
          {s:'fail',c:'Industry revenue floor (trucking)',n:'$142k \u00b7 FAIL'},
          {s:'pass',c:'No reverse consolidation (GFE et al.)',n:'None'},
          {s:'fail',c:'No forged / altered documents',n:'Flagged \u00b7 FAIL'},
          {s:'pass',c:'Not a non-profit',n:'LLC \u2713'},
          {s:'warn',c:'Prior default \u2264 24 mo',n:'14 mo \u00b7 letter'},
          {s:'pass',c:'No debt-recovery funder source',n:'Clean'},
        ]:[
          {s:'pass',c:'Negative-balance days \u2264 5',n:'1 day'},
          {s:'pass',c:'Withhold \u2264 30%',n:'6%'},
          {s:'pass',c:'Position limit (food svc \u2264 3)',n:'1 / 3'},
          {s:'pass',c:'Revenue stability (no \u226525% drop)',n:'\u22123% MoM'},
          {s:'pass',c:'No reverse consolidation (GFE et al.)',n:'None'},
          {s:'pass',c:'No stop-pay / return-item flags',n:'0'},
          {s:'pass',c:'Not a non-profit',n:'LLC \u2713'},
          {s:'pass',c:'No debt-recovery funder source',n:'Clean'},
          {s:'warn',c:'Statement recency (MTD or latest)',n:'June missing'},
        ];
        // dedupe the accidental double neg-day rule in flagged set
        const rr = flagged ? [
          {s:'fail',c:'Negative-balance days \u2264 5',n:'9 \u00b7 FAIL'},
          {s:'pass',c:'Withhold \u2264 30%',n:'22%'},
          {s:'fail',c:'Industry revenue floor (trucking)',n:'$142k \u00b7 FAIL'},
          {s:'fail',c:'No forged / altered documents',n:'Flagged \u00b7 FAIL'},
          {s:'pass',c:'No reverse consolidation (GFE et al.)',n:'None'},
          {s:'pass',c:'Position limit (trucking \u2264 4)',n:'2 / 4'},
          {s:'pass',c:'Not a non-profit',n:'LLC \u2713'},
          {s:'warn',c:'Prior default \u2264 24 mo',n:'14 mo \u00b7 letter'},
          {s:'pass',c:'No debt-recovery funder source',n:'Clean'},
        ] : rules;
        o.rules=rr.map((r,i)=>({...r,...itemMark(r.s),valColor:valCol(r.s),
          rowStyle:'display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid var(--border);'+(i%2===0?'border-right:1px solid var(--border)':'')}));
        const fails=rr.filter(r=>r.s==='fail').length;
        o.drStatusLabel=flagged?fails+' gates FAIL':'8 / 9 passing';
        o.drStatusStyle=flagged?'font:500 11px var(--sans);color:var(--bad);background:var(--bad-bg);padding:2px 9px;border-radius:999px':'font:500 11px var(--sans);color:var(--warn);background:var(--warn-bg);padding:2px 9px;border-radius:999px';
        if(flagged){ o.drBanner='padding:11px 16px;background:var(--bad-bg);border-top:1px solid var(--border);font-size:12px;color:var(--bad);display:flex;align-items:center;gap:8px'; o.drBannerIcon=React.createElement('path',{d:'M12 9v4m0 4h.01M10.3 4.3 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z'}); o.drBannerText='Three hard gates fail \u2014 forged docs, trucking revenue floor, and negative days. SOP says decline as-submitted.'; }
        else { o.drBanner='padding:11px 16px;background:var(--warn-bg);border-top:1px solid var(--border);font-size:12px;color:var(--warn);display:flex;align-items:center;gap:8px'; o.drBannerIcon=React.createElement('g',null,React.createElement('path',{d:'M12 9v4m0 4h.01'}),React.createElement('circle',{cx:'12',cy:'12',r:'9'})); o.drBannerText='Statement recency is the only soft fail \u2014 add June 2026 to clear it.'; }
        Object.assign(o, fbProps('declinerules'));
      }
      return o;
    });
    const lastScrubcardIdx=scrubBlocks.map((b,i)=>b.isScrubcardM?i:-1).reduce((a,b)=>Math.max(a,b),-1);
    scrubBlocks.forEach((b,i)=>{ if(b.isScrubcardM){ b.isLiveCard = (i===lastScrubcardIdx && !s.scrubDecided); } });
    const scrubSug=(label,q)=>({label,onClick:()=>this.askScrub(q)});
    const scrubSuggestions=[
      scrubSug('Request June statement from merchant','Request June statement from the merchant via WhatsApp'),
      scrubSug('Explain the missing-month flag','Explain why the missing month matters'),
      scrubSug('Override with justification','Override the flag with a written justification'),
    ];
    const scrubDocs=[{name:'Application.pdf'},{name:'BankStmt_Feb2026.pdf'},{name:'BankStmt_Mar2026.pdf'},{name:'BankStmt_Apr2026.pdf'},{name:'BankStmt_May2026.pdf'},{name:'VoidedCheck.jpg'}];
    const scrubTimeline=[
      {text:'WhatsApp intake \u00b7 Outreach Agent',time:'Yesterday',k:'done'},
      {text:'Documents parsed by Document Agent',time:'7:58 AM',k:'done'},
      {text:'Intake reviewed by Information Collection',time:'8:12 AM',k:'done'},
      {text:s.scrubDecided?'Marked scrubbed \u00b7 written to HubSpot':'Awaiting your scrub action',time:s.scrubDecided?'Just now':'Now',k:s.scrubDecided?'done':'now'},
    ].map(t=>({...t,dotStyle:tdot(t.k)}));

    // ===== MARCUS: renewals =====
    const rstatusStyle=(st)=>{ const c=st==='approved'?['var(--ok)','var(--ok-bg)']:st==='skipped'?['var(--text2)','var(--surface2)']:st==='sent'?['var(--accent)','var(--accent-bg)']:['var(--warn)','var(--warn-bg)']; return 'font:500 10.5px var(--mono);color:'+c[0]+';background:'+c[1]+';padding:3px 9px;border-radius:5px'; };
    const renewals=s.renewals.map(r=>{
      const status=r.sent?'sent':r.approved?'approved':r.skipped?'skipped':'pending';
      const statusLabel={sent:'Sent',approved:'Approved',skipped:'Skipped',pending:'Awaiting you'}[status];
      const channelDot=r.channel==='WhatsApp'?'var(--ok)':'var(--accent)';
      return {...r, status, statusLabel, statusStyle:rstatusStyle(status), channelDot,
        approveLabel:r.approved?'Approved':'Approve',
        approveStyle:'border:1px solid '+(r.approved?'var(--ok)':'var(--border2)')+';background:'+(r.approved?'var(--ok)':'var(--surface)')+';color:'+(r.approved?'#fff':'var(--text2)')+';padding:7px 12px;border-radius:8px;font-size:12.5px;font-weight:600;cursor:pointer',
        skipStyle:'border:1px solid var(--border2);background:'+(r.skipped?'var(--surface2)':'var(--surface)')+';color:var(--text2);padding:7px 12px;border-radius:8px;font-size:12.5px;font-weight:500;cursor:pointer',
        toggle:()=>this.toggleRenewal(r.id), skip:()=>this.skipRenewal(r.id),
        onEdit:(e)=>this.editRenewal(r.id, e.target.value),
      };
    });
    const renewalsApprovedCount=s.renewals.filter(r=>r.approved).length;

    // chat
    const cmono={data:'Da',advisory:'Ad',renewal:'Rn',funder:'Fn'};
    const agentPills=[
      {id:'data',name:'Data'},{id:'advisory',name:'Advisory'},{id:'renewal',name:'Renewal'},{id:'funder',name:'Funder'},
    ].map(p=>({...p,onClick:()=>this.setAgent(p.id),style:'border:none;background:'+(s.activeAgent===p.id?'var(--surface)':'transparent')+';color:'+(s.activeAgent===p.id?'var(--text)':'var(--text2)')+';padding:4px 12px;border-radius:6px;font-size:12.5px;font-weight:500;cursor:pointer;box-shadow:'+(s.activeAgent===p.id?'0 1px 2px rgba(16,15,13,.1),0 0 0 1px var(--border)':'none')}));
    const starter=(mono,label,q,icon)=>({mono,label,onClick:()=>this.askChat(q),icon:icon||'✦'});
    const chatStarters=[
      starter('Da','What was our funded volume last month by funder?','What was our funded volume last month by funder?','≡'),
      starter('Rn','Which merchants are renewing next month?','Which merchants are renewing next month?','↻'),
      starter('Da','Which funder had the highest approval rate?','Which funder had the highest approval rate?','✓'),
      starter('Fn','Match Coastal Dental to the best funders','Match Coastal Dental to the best funders','☆'),
    ];
    const momColor=(m)=>m.indexOf('\u2212')===0||m.indexOf('-')===0?'var(--bad)':'var(--ok)';
    const volumeRows=[
      {funder:'Pinnacle Advance',vol:'$2.41M',mom:'+12%'},
      {funder:'Forward Line',vol:'$1.88M',mom:'+4%'},
      {funder:'Capital Stack',vol:'$1.32M',mom:'\u22127%'},
      {funder:'Bedrock Funding',vol:'$0.96M',mom:'+21%'},
    ].map(r=>({...r,momColor:momColor(r.mom)}));
    const chatBlocks=s.chatThread.map(b=>({...b,isUser:b.kind==='user',isAgentText:b.kind==='agentText',isDataTable:b.kind==='dataTable',files:(b.files||[]).map(n=>({name:n})),hasFiles:(b.files||[]).length>0}));

    // agents directory \u2014 persona-aware, enterprise console
    const agMeta={
      conversationintake:{last:'2 min ago',bars:[3,5,4,6,5,7,6],today:14},
      underwriting:{last:'9:12 AM',bars:[4,6,5,7,8,6,9],today:23},
      scrubbing:{last:'8:58 AM',bars:[6,7,8,6,9,8,10],today:31},
      docparse:{last:'9:05 AM',bars:[8,9,7,10,9,11,10],today:42},
      infocollect:{last:'8:54 AM',bars:[3,4,5,4,6,5,6],today:9},
      outreach:{last:'7:00 AM',bars:[5,4,6,5,7,6,5],today:12},
      crosssale:{last:'Yesterday',bars:[2,3,2,4,3,4,3],today:2},
      renewal:{last:'7:00 AM',bars:[3,4,4,5,4,6,5],today:6},
      dealhealth:{last:'6 min ago',bars:[6,6,7,6,8,7,8],today:5},
      funder:{last:'8:50 AM',bars:[4,5,4,6,5,6,7],today:8},
      data:{last:'9:01 AM',bars:[3,4,3,5,4,5,4],today:4},
      advisory:{last:'Yesterday',bars:[2,2,3,2,3,3,2],today:1},
    };
    const agentCards=this.agents.map(a=>{ const m=agMeta[a.id]||{last:'\u2014',bars:[3,4,3,5,4,5,4],today:3}; const cfg=this.agentConfig[a.id]; const eff=this.autonomyOf(a.id);
      return {...a, autonomy:eff, autoStyle:this.autoStyle(eff),
      model:(cfg&&cfg.model)||'Claude Sonnet 4.6',
      last:m.last, todayLabel:m.today+' actions today',
      barEls:m.bars.map((h,i)=>({style:'width:4px;border-radius:2px;background:'+(i===m.bars.length-1?'var(--accent)':'#d6e1f8')+';height:'+(h*2)+'px'})),
      configure:(e)=>{ if(e&&e.stopPropagation) e.stopPropagation(); this.openAgentConfig(a.id); },
      onClick:()=>{
        if(isMarcus && a.id==='conversationintake') return this.goIntake();
        if(isMarcus && a.id==='scrubbing') return this.openScrub('cinnamon');
        if(isMarcus && a.id==='renewal') return this.go('renewals');
        if(isMarcus && a.id==='underwriting') return this.goIntake();
        if(isDiana && a.id==='underwriting') return this.openDeal('sunrise');
        if(isTalia && a.id==='underwriting') return this.openFundability('cinnamon');
        return this.setState({view:'chat',activeAgent:a.id,chatThread:[]});
    }};});
    const agQ=(s.agQuery||'').toLowerCase().trim(); const agF=s.agFilter||'all';
    const agMatch=(a)=>(!agQ||(a.name+' '+a.desc).toLowerCase().includes(agQ))&&(agF==='all'||a.autonomy===agF);
    const agGroupsDef=[
      {label:'Deal pipeline',hint:'Intake to underwrite \u2014 the deal assembly line',ids:['conversationintake','infocollect','docparse','scrubbing','underwriting','funder']},
      {label:'Growth & outreach',hint:'Renewals, campaigns, and expansion',ids:['renewal','outreach','crosssale']},
      {label:'Intelligence & advisory',hint:'Answers, monitoring, and guidance on demand',ids:['data','dealhealth','advisory']},
    ];
    const agGroups=agGroupsDef.map(g=>{ const list=g.ids.map(id=>agentCards.find(a=>a.id===id)).filter(Boolean).filter(agMatch); return {label:g.label, hint:g.hint, count:String(list.length), list, has:list.length>0}; });
    const agShown=agGroups.reduce((n,g)=>n+g.list.length,0);
    const agAutoN=this.agents.filter(a=>a.autonomy==='Automate').length;
    const agTotToday=this.agents.reduce((n,a)=>n+((agMeta[a.id]||{}).today||0),0);
    const agStatCard=(click)=>'background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px 16px;box-shadow:var(--shadow),inset 0 1px 0 rgba(255,255,255,.6);text-align:left'+(click?';cursor:pointer':'');
    const agStats=[
      {label:'Active agents',value:String(this.agents.length),sub:'All operational',style:agStatCard(false),onClick:()=>{}},
      {label:'Actions today',value:String(agTotToday),sub:'Across every agent',style:agStatCard(false),onClick:()=>{}},
      {label:'Awaiting approval',value:'3',sub:'Open in Tasks \u2192',style:agStatCard(true),onClick:()=>this.go('tasks')},
      {label:'Automation rate',value:Math.round(agAutoN/this.agents.length*100)+'%',sub:agAutoN+' of '+this.agents.length+' fully autonomous',style:agStatCard(false),onClick:()=>{}},
    ];
    const agFilters=[{id:'all',name:'All'},{id:'Automate',name:'Automate'},{id:'Confirm',name:'Confirm'},{id:'Suggest',name:'Suggest'}].map(f=>({...f,onClick:()=>this.setState({agFilter:f.id}),style:'border:none;background:'+(agF===f.id?'var(--surface)':'transparent')+';color:'+(agF===f.id?'var(--text)':'var(--text2)')+';padding:4px 11px;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;box-shadow:'+(agF===f.id?'0 1px 2px rgba(16,15,13,.1),0 0 0 1px var(--border)':'none')}));

    // completed (persona-aware)
    const completed=byP([
      {title:'Brick & Mortar Cafe',detail:'Approved \u00b7 $28,000 \u00b7 1.30',time:'9:02 AM'},
      {title:'Bella Boutique renewal',detail:'Counter sent \u00b7 $24,000',time:'8:41 AM'},
      {title:'Tao Noodle House',detail:'Declined \u00b7 3 stacked positions',time:'8:15 AM'},
      {title:'Greenfield Auto',detail:'Approved \u00b7 $52,000 \u00b7 1.34',time:'7:58 AM'},
    ],[
      {title:'Whitfield Plumbing',detail:'Scrubbed & submitted to Pinnacle',time:'9:14 AM'},
      {title:'Olive Branch Bistro',detail:'Renewal accepted \u00b7 $32,000',time:'8:47 AM'},
      {title:'Tao Noodle House',detail:'Funder match \u2192 Forward Line',time:'8:11 AM'},
      {title:'Northstar Glass',detail:'Intake complete via WhatsApp',time:'Yesterday'},
    ],[
      {title:'Maple & Co. Salon',detail:'Funded \u00b7 $28,000 \u00b7 1.31',time:'9:10 AM'},
      {title:'Pixel Print Co.',detail:'Denied \u00b7 stacked positions',time:'8:02 AM'},
      {title:'Cedar Yoga',detail:'Funded \u00b7 $44,000 \u00b7 1.29',time:'Yesterday'},
      {title:'Ironside Gym',detail:'Funded \u00b7 $60,000 \u00b7 1.33',time:'Yesterday'},
    ]);

    // knowledge
    const funders=[
      {name:'Pinnacle Advance',initial:'P',tier:'Tier 1 · A-paper',criteria:[{k:'Max advance',v:'$250k'},{k:'Factor range',v:'1.24 – 1.40'},{k:'Min monthly revenue',v:'$50k'},{k:'Max positions',v:'3'}]},
      {name:'Forward Line',initial:'F',tier:'Tier 1 · A/B-paper',criteria:[{k:'Max advance',v:'$400k'},{k:'Factor range',v:'1.22 – 1.45'},{k:'Min monthly revenue',v:'$40k'},{k:'Max positions',v:'4'}]},
      {name:'Capital Stack',initial:'C',tier:'Tier 2 · B-paper',criteria:[{k:'Max advance',v:'$150k'},{k:'Factor range',v:'1.32 – 1.49'},{k:'Min monthly revenue',v:'$30k'},{k:'Max positions',v:'2'}]},
      {name:'Bedrock Funding',initial:'B',tier:'Tier 2 · B/C-paper',criteria:[{k:'Max advance',v:'$100k'},{k:'Factor range',v:'1.38 – 1.55'},{k:'Min monthly revenue',v:'$25k'},{k:'Max positions',v:'5'}]},
    ];

    // conversations (persona-aware)
    const agentByMono={Uw:'Underwriting',Da:'Data Intelligence',Ic:'Info Collection',Rn:'Renewal',Fn:'Funder Intel',Sc:'Scrubbing',Ci:'Conversation Intake',Ad:'Advisory',Ou:'Outreach'};
    const cvo=(mono,title,snippet,time,fn)=>({mono,title,snippet,time,onClick:fn,agent:agentByMono[mono]||'Agent',recent:!/yesterday/i.test(time)});
    const conversations=byP([
      cvo('Uw','Sunrise Auto Repair \u2014 Underwriting','You: Run underwriting on this deal \u00b7 Agent returned a recommendation','9:14 AM',()=>this.openDeal('sunrise')),
      cvo('Da','Funded volume by funder','Data Intelligence Agent \u00b7 table + narrative','9:01 AM',()=>this.setState({view:'chat',activeAgent:'data',chatThread:[]})),
      cvo('Ic','Verde Landscaping \u2014 Intake','Information Collection Agent requested March statement','8:54 AM',()=>this.openDeal('verde')),
      cvo('Rn','Renewal opportunities','Renewal Agent \u00b7 3 merchants eligible this month','Yesterday',()=>this.setState({view:'chat',activeAgent:'renewal',chatThread:[]})),
      cvo('Fn','Coastal Dental \u2014 Funder match','Funder Intelligence Agent matched 3 funders','Yesterday',()=>this.openDeal('coastal')),
    ],[
      ...(s.intakeTaskDone?[cvo('Sc','Lone Star Freight \u2014 Intake \u2192 Scrub','6 statements from Gmail \u00b7 parsed \u00b7 scrubbed \u00b7 3 hard fails','Just now',()=>this.setState({view:'scrubbing',scrubVariant:'flagged'}))]:[]),
      cvo('Ci','Cinnamon Trail \u2014 WhatsApp auto-intake','Conversation Intake \u2192 parsed \u2192 scrubbed \u2192 sent to 3 funders','9:02 AM',()=>this.goIntake()),
      cvo('Sc','Cinnamon Trail Coffee \u2014 Scrubbing','You: Scrub this against Forward Line \u00b7 1 flag, missing June stmt','8:14 AM',()=>this.openScrub('cinnamon')),
      cvo('Rn','Renewal pipeline \u2014 3 merchants','Renewal Agent drafted outreach for Calzona, Eden, Brookside','7:00 AM',()=>this.go('renewals')),
      cvo('Fn','Hayden Auto Wash \u2014 Funder match','Funder Intelligence matched 4 candidates \u00b7 Pinnacle recommended','8:50 AM',()=>this.openScrub('hayden')),
      cvo('Ic','Riverside Salon \u2014 Document chase','Information Collection sent 2 email requests','Yesterday',()=>this.openScrub('riverside')),
    ],[
      cvo('Uw','Cinnamon Trail Coffee \u2014 Fundability','Underwriting Agent scored 82 \u00b7 awaiting your Fund / Deny','9:04 AM',()=>this.openFundability('cinnamon')),
      cvo('Ci','Inbound from Marcus Vega','Conversation Intake received a submission on WhatsApp','9:02 AM',()=>this.openFundability('cinnamon')),
      cvo('Uw','Pixel Print Co. \u2014 Fundability','Underwriting Agent scored 43 \u00b7 weak, stacked positions','7:56 AM',()=>this.openFundability('pixel')),
      cvo('Da','Funded volume by broker','Data Intelligence Agent \u00b7 Marcus Vega leads inbound quality','Yesterday',()=>this.setState({view:'chat',activeAgent:'data',chatThread:[]})),
      cvo('Fn','Maple & Co. \u2014 Funded','Contract generated \u00b7 broker notified on WhatsApp','Yesterday',()=>this.openFundability('maple')),
    ]);

    // integrations
    const istyle=(ok)=>ok?'display:inline-flex;align-items:center;font:500 11px var(--sans);color:var(--ok);background:var(--ok-bg);padding:2px 8px;border-radius:999px':'display:inline-flex;align-items:center;font:500 11px var(--sans);color:var(--text2);background:var(--surface2);padding:2px 8px;border-radius:999px';
    const integrations=[
      {initial:'H',name:'HubSpot',kind:'CRM · read / write',status:'Connected',ok:true},
      {initial:'S',name:'Salesforce',kind:'CRM · read / write',status:'Connected',ok:true},
      {initial:'L',name:'LendSaaS',kind:'LOS · read / write',status:'Connected',ok:true},
      {initial:'W',name:'WhatsApp Business',kind:'Channel',status:'Connected',ok:true},
    ].map(i=>({...i,style:istyle(i.ok)}));
    // Gmail — live view-model for the REAL Google OAuth integration
    const gml=s.gmail;
    const gmailConfigured=!!gml;
    const gmailConnected=gmailConfigured&&gml.status==='connected';
    const chipOk='display:inline-flex;align-items:center;gap:6px;font:500 11.5px var(--sans);color:var(--ok);background:var(--ok-bg);padding:3px 9px;border-radius:999px';
    const chipBad='display:inline-flex;align-items:center;gap:6px;font:500 11.5px var(--sans);color:var(--bad);background:var(--bad-bg);padding:3px 9px;border-radius:999px';
    const intOptions=[
      {id:'lendsaas', isGmail:false, isWhatsapp:false, isLetter:true, letter:'L', name:'LendSaaS', desc:'Loan origination system \u00b7 deals, offers, payoffs', tag:'Connected', tagStyle:istyle(true)},
      {id:'gmail', isGmail:true, isWhatsapp:false, isLetter:false, letter:'G', name:'Gmail', desc:'Pull applications & bank statements from your inbox \u00b7 OAuth 2.0', tag:gmailConnected?'Connected':(gmailConfigured?'Disconnected':'Set up'), tagStyle:gmailConnected?istyle(true):istyle(false)},
      {id:'whatsapp', isGmail:false, isWhatsapp:true, isLetter:false, letter:'W', name:'WhatsApp Business', desc:'Merchant chat \u2014 intake & outreach channel', tag:'Connected', tagStyle:istyle(true)},
    ].map(o=>({...o, onPick:()=>this.pickIntegration(o.id)}));
    const gmailVals={
      intPickerOpen:s.intPickerOpen, intOptions, openAddIntegration:this.openAddIntegration, closeAddIntegration:this.closeAddIntegration,
      gmailOpen:s.gmailOpen, closeGmail:this.closeGmail, openGmail:this.openGmail,
      gmailCardVisible:gmailConfigured,
      gmailShowSetup:!gmailConfigured, gmailShowDetail:gmailConfigured,
      gmailConnected, gmailDisconnectedState:gmailConfigured&&!gmailConnected,
      gmailStatusLabel:gmailConnected?'Connected':'Disconnected',
      gmailStatusStyle:gmailConnected?chipOk:chipBad,
      gmailDotStyle:'width:6px;height:6px;border-radius:50%;flex:none;background:'+(gmailConnected?'var(--ok)':'var(--bad)'),
      gmailName:gmailConfigured?gml.name:'', gmailEmail:gmailConfigured?gml.email:'',
      gmailHasPicture:gmailConfigured&&!!gml.picture, gmailNoPicture:gmailConfigured&&!gml.picture,
      gmailAvatarStyle:(gmailConfigured&&gml.picture)?('width:38px;height:38px;border-radius:50%;flex:none;background-image:url('+gml.picture+');background-size:cover;background-position:center'):'',
      gmailInitial:(gmailConfigured&&gml.name)?gml.name.charAt(0).toUpperCase():'G',
      gmailLastSyncRel:gmailConfigured?this.relTime(gml.lastSync):'Never',
      gmailLastSyncAbs:(gmailConfigured&&gml.lastSync)?new Date(gml.lastSync).toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'',
      gmailHasSyncAbs:gmailConfigured&&!!gml.lastSync,
      gmailSince:gmailConfigured?(gml.since||''):'',
      gmailSinceLabel:gmailConfigured?this.fmtDateLabel(gml.since):'',
      gmailDraftSince:s.gmailDraftSince,
      gmailMsgTotal:(gmailConfigured&&gml.msgTotal!=null)?Number(gml.msgTotal).toLocaleString():'\u2014',
      gmailMsgSince:(gmailConfigured&&gml.msgSince!=null)?('\u2248 '+Number(gml.msgSince).toLocaleString()):'\u2014',
      gmailApiNote:gmailConfigured?(gml.apiNote||''):'', gmailHasApiNote:gmailConfigured&&!!gml.apiNote,
      setGmailDraftSince:this.setGmailDraftSince, changeGmailSince:this.changeGmailSince,
      gmailError:s.gmailError||'', gmailHasError:!!s.gmailError,
      gmailConnect:this.gmailConnect, gmailSync:this.gmailSync, gmailDisconnect:this.gmailDisconnect,
      gmailConnectLabel:s.gmailBusy==='connect'?'Waiting for Google\u2026':'Sign in with Google',
      gmailSyncLabel:s.gmailBusy==='sync'?'Syncing\u2026':'Sync now',

      gmailCardStatus:gmailConnected?'Connected':'Disconnected',
      gmailCardStatusStyle:gmailConnected?istyle(true):'display:inline-flex;align-items:center;font:500 11px var(--sans);color:var(--bad);background:var(--bad-bg);padding:2px 8px;border-radius:999px',
      gmailCardSub:gmailConfigured?(gmailConnected?('Last sync '+this.relTime(gml.lastSync).toLowerCase()+' \u00b7 since '+this.fmtDateLabel(gml.since)):'Access revoked \u00b7 reconnect to resume syncing'):'',
    };

    const genericMap={
      organizations:{title:'Organizations',body:'Manage teams, roles, and agent permission scoping across your org. 1 workspace \u00b7 14 members.'},
      settings:{title:'Settings',body:'Profile, notification preferences, and per-agent guardrails \u2014 autonomy levels, approval workflows, and the hard limits that can\u2019t be overridden.'},
    };
    const gm=genericMap[v]||{title:'',body:''};

    // home content (persona-aware)
    const chipSt=(kind)=>{ const c={up:['var(--ok)','var(--ok-bg)'],down:['var(--bad)','var(--bad-bg)'],warn:['var(--warn)','var(--warn-bg)'],neu:['var(--text2)','var(--surface2)'],accent:['var(--accent)','var(--accent-bg)']}[kind]||['var(--text2)','var(--surface2)']; return 'font:500 10.5px var(--sans);color:'+c[0]+';background:'+c[1]+';padding:2px 7px;border-radius:999px'; };
    const homeData=byP({
      greeting:'Good morning, Diana.',
      subPre:'Your agents worked overnight.', subHi:'3 decisions', subSuf:'are waiting on you, and the queue is clean.',
      stat1Label:'In your queue', stat1Value:s.queueCount, stat1Sub:'submissions \u00b7 1 escalated', stat1Chip:'+3', stat1ChipStyle:chipSt('accent'),
      stat2Label:'Avg time to decision', stat2Value:'11', stat2Unit:'m', stat2Sub:'Compare 18m (last month)', stat2Chip:'\u219338%', stat2ChipStyle:chipSt('up'),
      stat3Label:'Pending your approval', stat3Value:'3', stat3Sub:'2 ready \u00b7 1 escalation', stat3Chip:'2 new', stat3ChipStyle:chipSt('warn'),
      stat4Label:'Decisions today', stat4Value:s.decidedToday, stat4Sub:'8 agent-assisted', stat4Chip:'+5', stat4ChipStyle:chipSt('up'),
      cmdPlaceholder:'Ask AI a question or make a request\u2026', heroLine:'What needs', heroAccent:'your call today?',
    },{
      greeting:'Good morning, Marcus.',
      subPre:'Outreach pulled in a fresh lead overnight and', subHi:'3 renewals', subSuf:'need your sign-off this morning.',
      stat1Label:'Deals in motion', stat1Value:'27', stat1Sub:'9 in flight \u00b7 4 ready to submit', stat1Chip:'+6', stat1ChipStyle:chipSt('up'),
      stat2Label:'Hours reclaimed this week', stat2Value:'14', stat2Unit:'h', stat2Sub:'from intake + scrub automation', stat2Chip:'+22%', stat2ChipStyle:chipSt('up'),
      stat3Label:'Renewals eligible', stat3Value:'3', stat3Sub:'in the next 30 days', stat3Chip:'this mo.', stat3ChipStyle:chipSt('warn'),
      stat4Label:'Deals submitted today', stat4Value:'4', stat4Sub:'2 scrubbed by agent', stat4Chip:'+2', stat4ChipStyle:chipSt('up'),
      cmdPlaceholder:'Ask AI a question or make a request\u2026', heroLine:'What\u2019s moving in', heroAccent:'your pipeline?',
    },{
      greeting:'Good morning, Talia.',
      subPre:'Brokers sent', subHi:'5 deals overnight', subSuf:'\u2014 all parsed and underwritten, 3 sitting at fundable.',
      stat1Label:'Inbound today', stat1Value:'5', stat1Sub:'all via WhatsApp Business', stat1Chip:'+5', stat1ChipStyle:chipSt('accent'),
      stat2Label:'Avg fundability', stat2Value:'68', stat2Sub:'3 fundable \u00b7 1 review \u00b7 1 weak', stat2Chip:'+4', stat2ChipStyle:chipSt('up'),
      stat3Label:'Awaiting your decision', stat3Value:'3', stat3Sub:'Fund or deny', stat3Chip:'action', stat3ChipStyle:chipSt('warn'),
      stat4Label:'Funded today', stat4Value:'$1.2M', stat4Sub:'7 deals \u00b7 auto-underwritten', stat4Chip:'+12%', stat4ChipStyle:chipSt('up'),
      cmdPlaceholder:'Ask AI a question or make a request\u2026', heroLine:'What should we', heroAccent:'fund next?',
    });

    // ===== BROKER AUTO-INTAKE PIPELINE =====
    const cur=s.intakeStep;
    const intakeStages=this.intakeStages.map((st,i)=>{
      let status;
      if(s.intakeDone) status='done';
      else if(cur===0) status='pending';
      else if(i<cur-1) status='done';
      else if(i===cur-1) status=s.intakeRunning?'active':'done';
      else status='pending';
      const c=status==='done'?['#fff','var(--ok)']:status==='active'?['#fff','var(--accent)']:['var(--text3)','var(--surface2)'];
      return {...st, status, isActive:status==='active', isDone:status==='done', isPending:status==='pending', notLast:i<this.intakeStages.length-1, showMono:status!=='done',
        nodeStyle:'width:34px;height:34px;border-radius:9px;flex:none;display:flex;align-items:center;justify-content:center;font:600 11px var(--mono);color:'+c[0]+';background:'+c[1]+(status==='active'?';box-shadow:0 0 0 4px var(--accent-bg)':''),
        cardStyle:'flex:1;min-width:0;border:1px solid '+(status==='active'?'var(--accent)':'var(--border)')+';background:var(--surface);border-radius:12px;padding:13px 15px;box-shadow:'+(status==='active'?'var(--shadow-lg)':'var(--shadow)')+';opacity:'+(status==='pending'?'.55':'1')+';transition:all .3s',
        lineStyle:'width:2px;flex:1;min-height:14px;background:'+(status==='done'?'var(--ok)':'var(--border)'),
        resultStyle:'font:500 10.5px var(--mono);padding:2px 8px;border-radius:5px;color:'+(status==='done'?'var(--ok)':status==='active'?'var(--accent)':'var(--text3)')+';background:'+(status==='done'?'var(--ok-bg)':status==='active'?'var(--accent-bg)':'var(--surface2)'),
      };
    });
    const whatsappMsgs=this.whatsappMsgs.map(m=>({...m,
      bubbleStyle:'max-width:80%;padding:9px 12px;border-radius:'+(m.from==='me'?'12px 12px 3px 12px':'12px 12px 12px 3px')+';box-shadow:0 1px 1px rgba(0,0,0,.08);'+(m.from==='me'?'align-self:flex-end;background:#d6f5cf;color:#0b2e16':'align-self:flex-start;background:#fff;color:#16181d'),
    }));
    const intakeProgress=s.intakeDone?'Complete':s.intakeRunning?'Running…':'Ready';
    const intakeBtnLabel=s.intakeDone?'Replay pipeline':s.intakeRunning?'Running…':'Start auto-intake';

    // ===== FUNDER FUNDABILITY =====
    const fd=this.inboundDeals.find(d=>d.id===s.fundDealId)||this.inboundDeals[0];
    const inboundQueue=this.inboundDeals.map(d=>({
      ...d, amountFmt:this.fmtMoney(d.amount), bandStyle:this.stageStyle(d.bandKind),
      scoreColor:d.score>=72?'var(--ok)':d.score>=55?'var(--warn)':'var(--bad)',
      onClick:()=>this.openFundability(d.id),
      rowStyle:'padding:12px;border-radius:10px;cursor:pointer;margin-bottom:2px;border:1px solid '+(s.fundDealId===d.id?'var(--border2)':'transparent')+';background:'+(s.fundDealId===d.id?'var(--surface2)':'transparent')+';transition:background .12s',
    }));
    const fundScoreColor=fd.score>=72?'var(--ok)':fd.score>=55?'var(--warn)':'var(--bad)';
    const fundFactor=fd.score>=72?1.30:fd.score>=55?1.38:1.49;
    const fundTerm=fd.score>=72?8:fd.score>=55?7:6;
    const fundRationale=[
      {label:'Revenue consistency',value:fd.score>=72?'Strong · low variance':fd.score>=55?'Adequate · some swing':'Volatile',dot:fd.score>=72?'var(--ok)':fd.score>=55?'var(--text3)':'var(--bad)'},
      {label:'Avg daily balance',value:fd.score>=72?'Healthy cushion':'Thin cushion',dot:fd.score>=72?'var(--ok)':'var(--text3)'},
      {label:'Active positions',value:fd.score>=55?'1–2 stacked':'3+ stacked',dot:fd.score>=55?'var(--text3)':'var(--bad)'},
      {label:'Time in business',value:'3.8 yrs · established',dot:'var(--ok)'},
    ];
    const fundRisk=fd.score>=72?[{t:'Most-recent month',d:'Broker flagged June pending — verify before disbursement.',sev:'Low'}]
      :fd.score>=55?[{t:'Position stacking',d:'Two active advances; daily debit load is elevated.',sev:'Medium'}]
      :[{t:'Stacked positions',d:'Three active advances — combined debit exceeds policy.',sev:'High'},{t:'Revenue trend',d:'Declining month-over-month across the window.',sev:'High'}];
    const sevStyleF=(sev)=>{ const c=sev==='High'?['var(--bad)','var(--bad-bg)']:sev==='Medium'?['var(--warn)','var(--warn-bg)']:['var(--text2)','var(--surface2)']; return 'font:500 10px var(--sans);color:'+c[0]+';background:'+c[1]+';padding:2px 8px;border-radius:5px;flex:none;margin-top:1px;text-transform:uppercase;letter-spacing:.03em'; };
    const fundDetail={
      name:fd.name, broker:fd.broker, amountFmt:this.fmtMoney(fd.amount), industry:fd.industry,
      score:fd.score, band:fd.band, bandStyle:this.stageStyle(fd.bandKind), scoreColor:fundScoreColor, scoreWidth:fd.score+'%',
      factorFmt:fundFactor.toFixed(2), termFmt:fundTerm+' months', paybackFmt:this.fmtMoney(Math.round(fd.amount*fundFactor)),
      rationale:fundRationale.map(r=>r), risk:fundRisk.map(r=>({...r,sevStyle:sevStyleF(r.sev)})),
      received:fd.received,
    };
    const denyReasons=['Excessive position stacking','Insufficient / declining revenue','Industry outside funder appetite','Recent NSFs / negative days','Advance amount exceeds program cap','Documents incomplete or unverifiable'];
    const denyReasonRows=denyReasons.map(r=>({label:r, selected:s.denyReason===r, onClick:()=>this.setDenyReason(r),
      style:'display:flex;align-items:center;gap:10px;padding:11px 14px;border:1px solid '+(s.denyReason===r?'var(--bad)':'var(--border)')+';background:'+(s.denyReason===r?'var(--bad-bg)':'var(--surface)')+';border-radius:10px;cursor:pointer;font-size:13.5px;transition:all .12s',
      dot:'width:15px;height:15px;border-radius:50%;border:2px solid '+(s.denyReason===r?'var(--bad)':'var(--border2)')+';flex:none;display:flex;align-items:center;justify-content:center;background:'+(s.denyReason===r?'var(--bad)':'transparent'),
    }));

    // ===== AGENT CONFIGURATION =====
    const cfg=s.cfgDraft||this.agentConfig[s.cfgAgentId]||this.agentConfig.scrubbing;
    const cfgAgent=this.agents.find(a=>a.id===s.cfgAgentId)||this.agents[1];
    const cfgAgentList=this.agents.map(a=>({...a, active:a.id===s.cfgAgentId, onClick:()=>this.openAgentConfig(a.id),
      rowStyle:'display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;cursor:pointer;transition:background .12s;'+(a.id===s.cfgAgentId?'background:var(--surface2)':'background:transparent'),
      monoStyle:'width:28px;height:28px;border-radius:7px;flex:none;display:flex;align-items:center;justify-content:center;font:600 10px var(--mono);'+(a.id===s.cfgAgentId?'background:#17171a;color:#fff':'background:var(--surface2);color:var(--text2)'),
    }));
    const autonomyOpts=['Suggest','Confirm','Automate'].map(a=>({label:a, selected:cfg.autonomy===a, onClick:()=>this.setCfgAutonomy(a),
      style:'flex:1;padding:11px 10px;border-radius:9px;border:1px solid '+(cfg.autonomy===a?'var(--accent)':'var(--border2)')+';background:'+(cfg.autonomy===a?'var(--accent-bg)':'var(--surface)')+';color:'+(cfg.autonomy===a?'var(--accent)':'var(--text2)')+';cursor:pointer;text-align:left;transition:all .12s',
      desc:{Suggest:'Surfaces ideas; never acts alone.',Confirm:'Drafts actions; waits for your OK.',Automate:'Acts within guardrails; logs everything.'}[a],
    }));
    const cfgTools=(cfg.tools||[]).map(t=>({name:t}));
    const cfgGuards=(cfg.guard||[]);

    // ===== WORKFLOWS =====
    const wfStatusOf=(w)=>s.wfStatus[w.id]||w.status;
    const workflowList=this.workflows.map(w=>{ const st=wfStatusOf(w); const active=st==='Active';
      return {...w, status:st,
      statusStyle:active?'display:inline-flex;align-items:center;gap:6px;font:500 11px var(--sans);color:var(--ok);background:var(--ok-bg);padding:3px 9px;border-radius:999px':'display:inline-flex;align-items:center;gap:6px;font:500 11px var(--sans);color:var(--text2);background:var(--surface2);padding:3px 9px;border-radius:999px',
      dotStyle:'width:5px;height:5px;border-radius:50%;background:'+(active?'var(--ok)':'var(--text3)'),
      chainEls:w.chain.map((m,i)=>({mono:m, style:'width:26px;height:26px;border-radius:8px;background:#17171a;color:#fff;display:flex;align-items:center;justify-content:center;font:600 9.5px var(--mono);margin-left:'+(i?'-6px':'0')+';box-shadow:0 0 0 2px var(--surface)'})),
      stepsLabel:w.steps+' steps', gatesLabel:w.gates===0?'Fully autonomous':(w.gates+' approval gate'+(w.gates>1?'s':'')),
      onOpen:()=>this.openWorkflow(w.id) };
    });
    const wfCanvas=(s.wfView==='canvas')?this.buildWf():null;

    // command palette results
    const paletteResults=this.paletteNav().map(n=>({
      label:n.label, kind:n.kind, tag:n.tag, mono:n.mono,
      onClick:()=>this.paletteGo(n.run),
      style:'width:100%;display:flex;align-items:center;gap:12px;padding:10px 12px;border:none;background:transparent;border-radius:11px;cursor:pointer;text-align:left;transition:background .12s',
      iconStyle:'width:30px;height:30px;border-radius:8px;background:var(--surface2);color:var(--text2);display:flex;align-items:center;justify-content:center;font:600 11px var(--mono);flex:none',
    }));

    return {
      ...nav,
      // persona switcher
      personaDiana:p==='diana', personaMarcus:p==='marcus', personaTalia:p==='talia',
      pickDiana:()=>this.pickPersona('diana'), pickMarcus:()=>this.pickPersona('marcus'), pickTalia:()=>this.pickPersona('talia'),
      psDianaStyle:psPill(p==='diana'), psMarcusStyle:psPill(p==='marcus'), psTaliaStyle:psPill(p==='talia'),
      psDianaAva:psAva(p==='diana','linear-gradient(135deg,#d6bbfb,#9b87f5)'),
      psMarcusAva:psAva(p==='marcus','linear-gradient(135deg,#fbd6a6,#f5a878)'),
      psTaliaAva:psAva(p==='talia','linear-gradient(135deg,#a6e3d0,#56b89a)'),
      // sidebar user identity
      userInitials:byP('DK','MV','TB'), userName:byP('Diana Koenig','Marcus Vega','Talia Brooks'), userRole:byP('Underwriter \u00b7 Northbridge','Broker \u00b7 Vega Capital','Funder \u00b7 Pinnacle Advance'),
      userAvaBg:byP('linear-gradient(135deg,#d6bbfb,#9b87f5)','linear-gradient(135deg,#fbd6a6,#f5a878)','linear-gradient(135deg,#a6e3d0,#56b89a)'),
      userAvaColor:byP('#3b2e6b','#6b3a16','#11463a'),
      // views
      isHome:v==='home', isUw:v==='underwriting', isScrubbing:v==='scrubbing', isRenewals:v==='renewals',
      isIntake:v==='intake', isFundability:v==='fundability', isAgentConfig:v==='agentConfig', isWorkflows:v==='workflows',
      isChat:v==='chat', isAgents:v==='agents', isTasks:v==='tasks', isKnowledge:v==='knowledge',
      isConversations:v==='conversations', isIntegrations:v==='integrations',
      isGeneric:(v==='organizations'||v==='settings'),
      genericTitle:gm.title, genericBody:gm.body,
      goHome:()=>this.go('home'), goConversations:()=>this.go('conversations'), goAgents:()=>this.go('agents'),
      goTasks:()=>this.go('tasks'), goWorkflows:()=>this.go('workflows'), goKnowledge:()=>this.go('knowledge'),
      goIntegrations:()=>this.go('integrations'), goOrganizations:()=>this.go('organizations'), goSettings:()=>this.go('settings'),
      newChat:this.newChat,
      // responsive sidebar (drawer on small screens)
      sidebarOpen:!!s.sidebarOpen, toggleSidebar:this.toggleSidebar, closeSidebar:this.closeSidebar,
      todayLabel:'Friday, July 3 \u00b7 9:24 AM',
      topbarTitle:{home:'Home',conversations:'Conversations',chat:'Conversation',agents:'Agents',agentConfig:'Agent configuration',tasks:'Tasks',workflows:'Workflows',knowledge:'Knowledge',integrations:'Integrations',organizations:'Organizations',settings:'Settings',underwriting:'Underwriting',scrubbing:'Scrubbing',renewals:'Renewals',intake:'Auto-intake',fundability:'Fundability'}[v]||'Atlas',
      // home
      ...homeData,
      cmd:s.cmd, setCmd:this.setCmd, cmdKey:this.cmdKey, submitCmd:this.submitCmd, cmdChips,
      toggleCite:()=>this.setState({citeSources:!s.citeSources}),
      citeTrackStyle:'width:30px;height:17px;border-radius:999px;padding:2px;display:flex;transition:background .18s;background:'+(s.citeSources?'var(--accent)':'var(--border2)'),
      citeKnobStyle:'width:13px;height:13px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.2);transition:transform .18s;transform:translateX('+(s.citeSources?'13px':'0')+')',
      cmdFiles:s.cmdFiles.map((n,i)=>({name:n,remove:()=>this.removeCmdFile(i)})), hasCmdFiles:s.cmdFiles.length>0, attachCmd:this.attachCmd, cmdFileRef:this.cmdFileRef, onCmdFiles:this.onCmdFiles,
      queueCount:s.queueCount, decidedToday:s.decidedToday,
      approvals, activity,
      // diana underwriting
      queue, deal, threadRef:this.threadRef, uwBlocks, docFields,
      scenarioButtons, scenarioAmountFmt:this.fmtMoney(s.scenario),
      factorDisplay:(+(this.recFor(s.scenario).factor+s.factorAdj).toFixed(2)).toFixed(2),
      factorAdjusted:Math.abs(s.factorAdj)>0.001, factorAdjLabel:(s.factorAdj>0?'+':'')+s.factorAdj.toFixed(2),
      factorBaseLabel:this.recFor(s.scenario).factor.toFixed(2),
      adjUp:()=>this.adjFactor(0.01), adjDown:()=>this.adjFactor(-0.01), resetFactor:this.resetFactor,
      auditMeta,
      approve:this.approve, decline:this.decline, escalate:this.escalate,
      typing:s.typing, typingLabel:s.typingLabel,
      uwInput:s.uwInput, setUwInput:this.setUwInput, uwKey:this.uwKey, sendUw:this.sendUw, uwSuggestions,
      documents, timeline,
      // marcus scrubbing
      scrubQueue, scrubDeal, scrubBlocks, scrubFields, scrubDocs, scrubTimeline,
      pickScrubClean:()=>this.setScrubVariant('clean'), pickScrubFlagged:()=>this.setScrubVariant('flagged'),
      svCleanStyle:'border:none;background:'+(s.scrubVariant==='clean'?'var(--surface)':'transparent')+';box-shadow:'+(s.scrubVariant==='clean'?'0 1px 2px rgba(16,15,13,.1),0 0 0 1px var(--border)':'none')+';color:'+(s.scrubVariant==='clean'?'var(--text)':'var(--text2)')+';white-space:nowrap;font:500 12px var(--sans);padding:6px 12px;border-radius:8px;cursor:pointer;'+(s.scrubVariant==='clean'?'box-shadow:0 1px 2px rgba(16,18,29,.08)':''),
      svFlaggedStyle:'border:none;background:'+(s.scrubVariant==='flagged'?'var(--surface)':'transparent')+';box-shadow:'+(s.scrubVariant==='flagged'?'0 1px 2px rgba(16,15,13,.1),0 0 0 1px var(--border)':'none')+';color:'+(s.scrubVariant==='flagged'?'var(--text)':'var(--text2)')+';white-space:nowrap;font:500 12px var(--sans);padding:6px 12px;border-radius:8px;cursor:pointer;'+(s.scrubVariant==='flagged'?'box-shadow:0 1px 2px rgba(16,18,29,.08)':''),
      // scrub popups + forged review
      scrubPopup:sp, closeScrubPopup:this.closeScrubPopup,
      popupTitle:pd?pd.title:'', popupSub:pd?pd.sub:'', popupCount:pd?pd.count:'', popupTotal:pd?pd.total:'', popupNegColor:pd?pd.negColor:'var(--text2)', popupRows:popupRowsResolved,
      // Sources & Edit inspector drawer
      srcPanelOpen:!!srcDef, srcPanelTitle:srcDef?srcDef.title:'', srcPanelSub:srcDef?srcDef.sub:'', srcGroups, srcFoot:srcDef?srcDef.foot:'', closeSrcPanel:this.closeSrcPanel,
      srcPanelView, srcSelLabel, startSrcResize:this.startSrcResize,
      srcLeftStyle:'flex:none;width:calc('+(srcSplit*100)+'% - 3px);overflow-y:auto;overflow-x:hidden;background:var(--surface2)',
      srcRightStyle:'flex:1;min-width:0;overflow-y:auto;overflow-x:hidden;background:var(--surface)',
      viewResolutionLetter:()=>this.openScrubPopup('resolution'),
      popupWidth,
      popupIsResolution:sp==='resolution', popupIsDeposit:sp==='deposit_transfers'||sp==='deposit_p2p'||sp==='deposit_refunds'||sp==='deposit_factoring', popupIsNegDays:sp==='negdays',
      popupHeaderNote:pd?(pd.headerNote||''):'', popupFootNote:pd?(pd.footNote||''):'',
      popupIsInclude:sp==='deposit_count'||sp==='largest', popupIsAvg3mo:sp==='avg3mo', popupIsRetarget:sp==='retarget',
      retargetOptions:[{id:'trucking',label:'Trucking / freight'},{id:'construction',label:'Construction'},{id:'other',label:'General / other'}].map(opt=>({label:opt.label, onClick:()=>this.setRetargetIndustry(opt.id),
        style:'display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:1px solid '+(s.retargetIndustry===opt.id?'var(--accent)':'var(--border2)')+';background:'+(s.retargetIndustry===opt.id?'var(--accent-bg)':'var(--surface)')+';color:var(--text);padding:11px 13px;border-radius:10px;font:600 13px var(--sans);cursor:pointer;transition:all .14s',
        dot:'width:14px;height:14px;border-radius:50%;flex:none;border:2px solid '+(s.retargetIndustry===opt.id?'var(--accent)':'var(--border2)')+';background:'+(s.retargetIndustry===opt.id?'var(--accent)':'transparent')+';box-shadow:'+(s.retargetIndustry===opt.id?'inset 0 0 0 2px var(--surface)':'none')})),
      confirmRetarget:this.confirmRetarget,
      retargetConfirmLabel:'Confirm & re-target',
      retargetConfirmStyle:'margin-top:16px;width:100%;border:none;border-radius:10px;padding:12px;font:600 14px var(--sans);display:flex;align-items:center;justify-content:center;gap:8px;'+(s.retargetIndustry?'background:var(--accent);color:#fff;cursor:pointer':'background:var(--surface2);color:var(--text3);cursor:not-allowed'),
      forgedReviewOpen:s.forgedReviewOpen, closeForgedReview:this.closeForgedReview, confirmForgedReview:this.confirmForgedReview,
      scrubOcrOpen:s.scrubOcrOpen, scrubOcrValue:s.scrubOcrValue, scrubOcrCandidates:ocrCands, closeScrubOcr:this.closeScrubOcr, setScrubOcrValue:this.setScrubOcrValue, confirmScrubOcr:this.confirmScrubOcr,
      scrubRef:this.scrubRef, scrubInput:s.scrubInput, setScrubInput:this.setScrubInput,
      scrubFiles:s.scrubFiles.map((n,i)=>({name:n,remove:()=>this.removeScrubFile(i)})), hasScrubFiles:s.scrubFiles.length>0, attachScrub:this.attachScrub, scrubFileRef:this.scrubFileRef, onScrubFiles:this.onScrubFiles,
      scrubKey:this.scrubKey, sendScrub:this.sendScrub, scrubSuggestions,
      scrubTyping:s.scrubTyping, scrubTypingLabel:s.scrubTypingLabel,
      requestDocs:this.handoffInfo, markScrubbed:this.markScrubbed, overrideFlag:this.overrideFlag,
      // marcus renewals
      renewals, renewalsApprovedCount, sendRenewals:this.sendRenewals,
      sendRenewalsStyle:'background:'+(renewalsApprovedCount?'var(--accent)':'var(--surface2)')+';color:'+(renewalsApprovedCount?'#fff':'var(--text3)')+';border:1px solid '+(renewalsApprovedCount?'var(--accent)':'var(--border2)')+';padding:9px 16px;border-radius:9px;font-size:13px;font-weight:600;cursor:'+(renewalsApprovedCount?'pointer':'not-allowed'),
      // chat
      chatRef:this.chatRef, chatBlocks, chatEmpty:s.chatThread.length===0, chatActive:s.chatThread.length>0, chatStarters, chatTitle:s.chatThread.length===0?'New conversation':'Conversation',
      chatInput:s.chatInput, setChatInput:this.setChatInput, chatKey:this.chatKey, sendChat:this.sendChat,
      composerAgent:s.composerAgent||'all',
      composerAgentLabel:((s.composerAgent||'all')==='all')?'All agents':((this.agents.find(a=>a.id===s.composerAgent)||{}).name||'All agents'),
      composerAgentOpts:[{id:'all',mono:'\u273f',name:'All agents'}, ...this.agents.map(a=>({id:a.id,mono:a.mono,name:a.name}))].map(o=>{ const on=(s.composerAgent||'all')===o.id; return {...o, selected:on, onClick:()=>this.pickComposerAgent(o.id), style:'width:100%;display:flex;align-items:center;gap:9px;border:none;background:'+(on?'var(--accent-bg)':'transparent')+';border-radius:7px;padding:7px 9px;cursor:pointer;text-align:left;margin-bottom:1px', monoStyle:'width:22px;height:22px;border-radius:6px;flex:none;display:flex;align-items:center;justify-content:center;font:600 9px var(--mono);'+(on?'background:var(--accent);color:#fff':'background:var(--surface2);color:var(--text2)')}; }),
      agentMenuOpen:!!s.agentMenuOpen, toggleAgentMenu:this.toggleAgentMenu, closeAgentMenu:this.closeAgentMenu,
      onboardOpen:!!s.onboardOpen, onboardSkip:this.onboardSkip, openOnboard:this.openOnboard, dismissSourcePrompt:this.dismissSourcePrompt,
      showSourcePrompt:(!(s.gmail&&s.gmail.status==='connected')) && !s.sourcePromptDismissed && !s.onboardOpen,
      onboardSources:[{id:'gmail',letter:'G',name:'Gmail',desc:'Pull applications & bank statements from your inbox',shortDesc:'Applications & statements'},{id:'whatsapp',letter:'W',name:'WhatsApp Business',desc:'Merchant chat \u2014 intake & outreach',shortDesc:'Merchant chat'},{id:'lendsaas',letter:'L',name:'LendSaaS',desc:'Loan origination \u2014 deals, offers, payoffs',shortDesc:'Deals & payoffs'}].map(o=>({...o, onClick:()=>this.onboardPick(o.id), iconStyle:'width:34px;height:34px;border-radius:9px;flex:none;display:flex;align-items:center;justify-content:center;font:600 13px var(--sans);background:var(--surface2);color:var(--text2)'})),
      chatFiles:s.chatFiles.map((n,i)=>({name:n,remove:()=>this.removeChatFile(i)})), hasChatFiles:s.chatFiles.length>0, attachChat:this.attachChat, chatFileRef:this.chatFileRef, onChatFiles:this.onChatFiles,
      chatTyping:s.chatTyping, chatTypingLabel:s.chatTypingLabel, activeMono:cmono[s.activeAgent]||'Da',
      agentPills, volumeRows,
      agentCards, completed, funders, conversations,
      agGroups, agStats, agFilters, agEmpty:agShown===0,
      agQuery:s.agQuery||'', setAgQuery:(e)=>this.setState({agQuery:e.target.value}),
      ...(()=>{ const q=(s.convQuery||'').toLowerCase().trim(); const cf=s.convFilter||'all';
        const base=conversations.filter(c=>{
          const matchQ=!q||(c.title+' '+c.snippet+' '+c.agent).toLowerCase().includes(q);
          const isDeal=c.title.includes('\u2014');
          const matchF=cf==='all'||(cf==='deals'&&isDeal)||(cf==='agents'&&!isDeal);
          return matchQ&&matchF;
        });
        const filters=[{id:'all',name:'All'},{id:'deals',name:'Deals'},{id:'agents',name:'Agent chats'}].map(f=>({...f,onClick:()=>this.setState({convFilter:f.id}),style:'border:none;background:'+(cf===f.id?'var(--surface)':'transparent')+';color:'+(cf===f.id?'var(--text)':'var(--text2)')+';padding:4px 11px;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;box-shadow:'+(cf===f.id?'0 1px 2px rgba(16,15,13,.1),0 0 0 1px var(--border)':'none')}));
        return { convRecent:base.filter(c=>c.recent), convEarlier:base.filter(c=>!c.recent), convHasRecent:base.some(c=>c.recent), convHasEarlier:base.some(c=>!c.recent), convCount:base.length,
          convQuery:s.convQuery||'', setConvQuery:(e)=>this.setState({convQuery:e.target.value}), convFilters:filters };
      })(),
      integrations,
      ...gmailVals,
      ...(()=>{ // intake confirm task view-model
        const itThread=s.intakeThreadId?this.gmailThreads.find(t=>t.id===s.intakeThreadId):null;
        const nSel=s.intakeDocsSel.length;
        const iq=(s.intakeQuery||'').toLowerCase().trim();
        const itThreadsAll=this.gmailThreads.filter(t=>!iq||(t.from+' '+t.biz+' '+t.subject+' '+t.snippet).toLowerCase().includes(iq));
        return {
          intakeTaskOpen:s.intakeTaskOpen, closeIntakeTask:this.closeIntakeTask, backToIntakeThreads:this.backToIntakeThreads,
          itThreadsStep:s.intakeTaskStep==='threads', itDocsStep:s.intakeTaskStep==='docs'&&!!itThread,
          intakeQuery:s.intakeQuery||'', setIntakeQuery:(e)=>this.setState({intakeQuery:e.target.value}),
          itSubtitle:'Conversation Intake \u00b7 autonomy: '+this.autonomyOf('conversationintake')+' \u2014 '+(this.autonomyOf('conversationintake')==='Suggest'?'I\u2019ll suggest what to ingest':'choose what I should ingest'),
          itThreadsEmpty:itThreadsAll.length===0,
          itThreadsCountLabel:iq?(itThreadsAll.length+' of '+this.gmailThreads.length+' threads'):'Threads with attachments \u00b7 select one',
          itThreads:itThreadsAll.map(t=>({ ...t, onPick:()=>this.pickIntakeThread(t.id),
            fromWeight:t.unread?'700':'600', countLabel:String(t.count),
            avaStyle:'width:36px;height:36px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;background:var(--accent-bg);color:var(--accent)',
            initial:t.from.charAt(0) })),
          itSubject:itThread?itThread.subject:'', itSender:itThread?(itThread.from+' \u00b7 '+itThread.biz):'',
          itDocs:itThread?itThread.docs.map(d=>{ const on=s.intakeDocsSel.includes(d.id); return { ...d, on, onToggle:()=>this.toggleIntakeDoc(d.id),
            isPdf:/\.pdf$/i.test(d.name), isImg:!/\.pdf$/i.test(d.name),
            rowStyle:'display:flex;align-items:center;gap:12px;padding:11px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .12s;'+(on?'background:var(--accent-bg)':''),
            boxStyle:'width:18px;height:18px;border-radius:5px;flex:none;display:flex;align-items:center;justify-content:center;transition:all .12s;'+(on?'background:var(--accent);border:1px solid var(--accent)':'background:var(--surface);border:1.5px solid var(--border2)') }; }):[],
          itFrom:s.intakeFrom, itTo:s.intakeTo, setIntakeFrom:this.setIntakeFrom, setIntakeTo:this.setIntakeTo,
          allIntakeDocs:this.allIntakeDocs, clearIntakeDocs:this.clearIntakeDocs, confirmIntakeDocs:this.confirmIntakeDocs, confirmIntakeManual:this.confirmIntakeManual,
          itSelSummary:nSel+' of '+(itThread?itThread.docs.length:0)+' selected',
          itConfirmLabel:'Intake & auto-scrub',
          itManualStyle:'display:flex;align-items:center;justify-content:center;gap:7px;border:1px solid '+(nSel?'var(--border2)':'var(--border)')+';background:var(--surface);border-radius:10px;padding:12px 16px;font-size:13px;font-weight:600;'+(nSel?'color:var(--text);cursor:pointer':'color:var(--text3);cursor:not-allowed'),
          itConfirmStyle:'flex:1;display:flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:10px;padding:12px;font-size:13.5px;font-weight:600;'+(nSel?'background:var(--accent);color:#fff;cursor:pointer':'background:var(--surface2);color:var(--text3);cursor:not-allowed'),
        }; })(),
      // broker auto-intake
      intakeStages, whatsappMsgs, intakeProgress, intakeBtnLabel,
      intakeRunning:s.intakeRunning, intakeDone:s.intakeDone,
      startIntake:this.startIntake, resetIntake:this.resetIntake, goIntake:this.goIntake,
      // funder fundability
      inboundQueue, fundDetail,
      fundDecision:s.fundDecision, isFundChoose:(s.fundDecision===null && s.denyStep==='choose'),
      isDenyReason:(s.fundDecision===null && s.denyStep==='reason'), isFunded:s.fundDecision==='funded', isDenied:s.fundDecision==='denied',
      denyReasonRows, denyReason:s.denyReason,
      fundDeal:this.fundDeal, startDeny:this.startDeny, confirmDeny:this.confirmDeny, resetFund:this.resetFund,
      confirmDenyStyle:'flex:1;background:'+(s.denyReason?'var(--bad)':'var(--surface2)')+';color:'+(s.denyReason?'#fff':'var(--text3)')+';border:1px solid '+(s.denyReason?'var(--bad)':'var(--border2)')+';border-radius:9px;padding:12px;font-size:13.5px;font-weight:600;cursor:'+(s.denyReason?'pointer':'not-allowed'),
      // agent configuration
      cfgAgentList, cfgAgent, cfg, cfgAutonomy:cfg.autonomy, cfgPrompt:cfg.prompt, cfgModel:cfg.model,
      autonomyOpts, cfgTools, cfgGuards, cfgSaved:s.cfgSaved,
      setCfgPrompt:this.setCfgPrompt, saveCfg:this.saveCfg, openAgentConfig:this.openAgentConfig,
      // workflows
      isWfList:s.wfView!=='canvas', isWfCanvas:s.wfView==='canvas',
      workflowList, wfCount:this.workflows.length, newWorkflow:this.newWorkflow,
      backToWorkflows:this.backToWorkflows, runWorkflow:this.runWorkflow,
      wfZoomIn:this.wfZoomIn, wfZoomOut:this.wfZoomOut, wfZoomReset:this.wfZoomReset,
      toggleWfStatus:this.toggleWfStatus, wfTogglePalette:this.wfTogglePalette, clearWfNode:this.clearWfNode,
      ...(wfCanvas||{}),
      // command palette
      paletteOpen:s.paletteOpen, paletteQuery:s.paletteQuery,
      openPalette:this.openPalette, closePalette:this.closePalette, stop:this.stop,
      setPaletteQuery:this.setPaletteQuery, paletteKey:this.paletteKey, runAsk:this.runAsk, paletteRef:this.paletteRef,
      paletteHasQuery:s.paletteQuery.trim().length>0,
      paletteResults, paletteHasNav:paletteResults.length>0,
      paletteEmpty:(s.paletteQuery.trim().length>0 && paletteResults.length===0),
      askRowStyle:'width:100%;display:flex;align-items:center;gap:12px;padding:10px 12px;border:none;background:transparent;border-radius:11px;cursor:pointer;text-align:left;transition:background .12s',
      // manual document review
      reviewOpen:s.reviewOpen, reviewValue:s.reviewValue,
      openManualReview:this.openManualReview, closeReview:this.closeReview, setReviewValue:this.setReviewValue, confirmReview:this.confirmReview,
      toast:s.toast,
      ...this.notifVals(s),
      toastCtaLabel:s.toastCta?'Review':null, toastCtaClick:()=>this.runNotifCta(s.toastCta),
      taskSnack:!!s.taskSnack, taskSnackTitle:s.taskSnack?s.taskSnack.title:'', taskSnackSub:s.taskSnack?s.taskSnack.sub:'',
      openTaskSnack:this.openTaskSnack, dismissTaskSnack:this.dismissTaskSnack,
      // ===== auth + add-knowledge =====
      ...(()=>{
        this.kFileRef=this.kFileRef||React.createRef();
        this.kDocsRef=this.kDocsRef||React.createRef();
        const busy=s.authBusy||null;
        const scr=s.authScreen||'login', astep=s.authStep||'email';
        const chip=(isNew)=>'flex:none;font:500 11px var(--sans);padding:2px 8px;border-radius:999px;margin-left:auto;'+(isNew?'color:var(--accent);background:var(--accent-bg)':'color:var(--ok);background:var(--ok-bg)');
        const kFunders=[...(s.addedFunders||[]),...funders].map(f=>({...f, statusLabel:f.isNew?'New':'Active', statusStyle:chip(f.isNew)}));
        const kDocsSeed=[
          {name:'Broker Scrub SOP v3.pdf',ext:'PDF',size:'1.8 MB',meta:'Added Jun 12 \u00b7 Marcus Vega',agents:['Platform agent','Scrubbing']},
          {name:'Restricted industries \u2014 2026.pdf',ext:'PDF',size:'240 KB',meta:'Added May 28 \u00b7 Compliance',agents:['Platform agent','Scrubbing','Underwriting']},
          {name:'Renewal outreach playbook.docx',ext:'DOCX',size:'96 KB',meta:'Added May 9 \u00b7 Talia Brooks',agents:['Platform agent','Renewal','Outreach']},
        ];
        const kDocs=[...(s.addedDocs||[]),...kDocsSeed].map(d=>({...d, statusLabel:d.isNew?'New':'Live', statusStyle:'flex:none;font:500 11px var(--sans);padding:2px 8px;border-radius:999px;'+(d.isNew?'color:var(--accent);background:var(--accent-bg)':'color:var(--ok);background:var(--ok-bg)')}));
        const staged=(s.kStagedDocs||[]).map((f,i)=>({...f, isLink:f.kind==='link', isFile:f.kind!=='link', remove:()=>this.kRemoveStaged(i)}));
        const agSel=s.kDocAgents||[];
        const kAgentOpts=this.agents.map(a=>a.name).map(a=>{ const on=agSel.includes(a); return {name:a, onClick:()=>this.kToggleAgent(a), style:'border:1px solid '+(on?'var(--accent)':'var(--border2)')+';background:'+(on?'var(--accent-bg)':'var(--surface)')+';color:'+(on?'var(--accent)':'var(--text2)')+';padding:5px 12px;border-radius:999px;font-size:12px;font-weight:500;cursor:pointer'}; });
        const kstep=s.kAddStep||'intent', kmode=s.kFunderMode||'upload', ksrc=s.kSource||'file';
        const seg=(on)=>'flex:1;border:none;background:'+(on?'var(--surface)':'transparent')+';color:'+(on?'var(--text)':'var(--text2)')+';padding:6px 12px;border-radius:7px;font-size:12.5px;font-weight:500;cursor:pointer;box-shadow:'+(on?'0 1px 2px rgba(16,15,13,.1),0 0 0 1px var(--border)':'none');
        const nStaged=staged.length;
        return {
          isAuthScreen:!s.authed,
          authLoginScreen:scr==='login',
          authSignupEmail:scr==='signup'&&astep==='email',
          authSignupVerify:scr==='signup'&&astep==='verify',
          authSignupProfile:scr==='signup'&&astep==='profile',
          authEmail:s.authEmail!==undefined?s.authEmail:'marcus@vega.capital',
          authPw:s.authPw!==undefined?s.authPw:'vega-capital-demo',
          authEmail2:s.authEmail2||'', authName:s.authName||'', authPw2:s.authPw2||'', authCode:s.authCode||'',
          setAuthEmail:this.authSet('authEmail'), setAuthPw:this.authSet('authPw'), setAuthEmail2:this.authSet('authEmail2'),
          setAuthName:this.authSet('authName'), setAuthPw2:this.authSet('authPw2'), setAuthCode:this.authSetCode,
          authPwType:s.authShowPw?'text':'password', authTogglePw:this.authTogglePw,
          authShowPwOff:!s.authShowPw, authShowPwOn:!!s.authShowPw,
          authError:s.authError||null, authNotice:s.authNotice||null, authMail:!!s.authMail,
          authGoogle:this.authGoogle, authLogin:this.authLogin, authContinueEmail:this.authContinueEmail,
          authVerify:this.authVerify, authCreate:this.authCreate, authUseCode:this.authUseCode, authResend:this.authResend,
          goSignup:()=>this.authSwitch('signup'), goLogin:()=>this.authSwitch('login'), authBackToEmail:this.authBackToEmail,
          authForgot:this.authForgot, signOut:this.signOut,
          authLoginKey:this.authKey(this.authLogin), authEmailKey:this.authKey(this.authContinueEmail),
          authCodeKey:this.authKey(this.authVerify), authCreateKey:this.authKey(this.authCreate),
          authBusyLogin:busy==='login', authBusyVerify:busy==='verify', authBusyCreate:busy==='create',
          authGoogleLabel:busy==='google'?'Connecting to Google\u2026':'Continue with Google',
          authLoginLabel:busy==='login'?'Signing in\u2026':'Sign in',
          authVerifyLabel:busy==='verify'?'Verifying\u2026':'Verify email',
          authCreateLabel:busy==='create'?'Creating workspace\u2026':'Create account',
          // knowledge
          kFunders, kDocs, kFunderCount:kFunders.length, kDocCount:kDocs.length,
          kAddOpen:!!s.kAddOpen, openKAdd:this.openKAdd, closeKAdd:this.closeKAdd,
          kAddTitle:'Add knowledge',
          kAddSub:'Personal SOPs, docs & links your agents follow and cite.',
          kIsFile:ksrc==='file', kIsLink:ksrc==='link', kIsDrive:ksrc==='drive',
          kSrcFile:()=>this.kSetSource('file'), kSrcLink:()=>this.kSetSource('link'), kSrcDrive:()=>this.kSetSource('drive'),
          kSrcFileStyle:seg(ksrc==='file'), kSrcLinkStyle:seg(ksrc==='link'), kSrcDriveStyle:seg(ksrc==='drive'),
          kDocsRef:this.kDocsRef,
          kBrowseDocs:()=>{ this.kDocsRef.current&&this.kDocsRef.current.click(); },
          kBrowseDrive:this.kBrowseDrive, kOnDocs:this.kOnDocs,
          kLinkInput:s.kLinkInput||'', setKLink:this.setKLink, kAddLink:this.kAddLink,
          kLinkKey:(e)=>{ if(e.key==='Enter'){ e.preventDefault(); this.kAddLink(); } },
          kAddError:s.kAddError||null,
          kStaged:staged, kHasStaged:nStaged>0, kAgentOpts, kAddDocs:this.kAddDocs,
          kDocsBtnLabel:nStaged?('Add '+nStaged+' item'+(nStaged===1?'':'s')+' \u2014 live immediately'):'Add knowledge',
          kDocsBtnStyle:'flex:1;border:none;border-radius:9px;padding:10px;font-size:13px;font-weight:600;'+(nStaged?'background:var(--accent);color:#fff;cursor:pointer':'background:var(--surface2);color:var(--text3);cursor:not-allowed'),
          // simulated Google account chooser
          gPickerOpen:!!s.gPickerOpen, closeGPicker:this.closeGPicker,
          gAccountRows:this.gAccounts.map(a=>({...a, initial:a.name.charAt(0), onPick:()=>this.gPickerChoose(a), isBusy:s.gPickerBusy===a.email})),
          gPickerOtherOpen:!!s.gPickerOther, gPickerOtherClosed:!s.gPickerOther,
          gPickerUseOther:this.gPickerUseOther,
          gPickerEmail:s.gPickerEmail||'', setGPickerEmail:(e)=>this.setState({gPickerEmail:e.target.value}),
          gPickerOtherGo:this.gPickerOtherGo, gPickerOtherKey:this.authKey(this.gPickerOtherGo),
          gPickerOtherBusy:!!s.gPickerBusy&&s.gPickerBusy===(s.gPickerEmail||'').trim(),
        };
      })(),
    };
  }

  render(){
    const b = this.renderVals();
    return <Root b={b} />;
  }
}
