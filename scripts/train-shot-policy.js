const fs=require('fs');
const path=require('path');

const inputPath=process.argv[2]||'spike-dataset.json';
const outputPath=process.argv[3]||'ai-shot-policy.json';
const SKILLS=['bump','set','tip','spike'];

function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}
function bucket(v,lo,hi,n){
  if(hi<=lo)return 0;
  return clamp(Math.floor(((v-lo)/(hi-lo))*n),0,n-1);
}
function keyFromSample(sample){
  return [
    clamp(sample.aiTouches||0,0,2),
    bucket(sample.rallyHits||0,0,12,4),
    bucket(sample.ball?.x||0,0,800,6),
    bucket(sample.ball?.y||0,0,500,6),
    bucket(sample.ball?.vx||0,-20,20,5),
    bucket(sample.ball?.vy||0,-20,20,5),
    bucket(sample.player?.x||0,0,800,6),
    bucket(sample.player?.y||0,0,500,5),
    sample.ai?.onGround?0:1
  ].join('|');
}

function readDataset(file){
  const raw=JSON.parse(fs.readFileSync(file,'utf8'));
  return raw.dataset||raw.clips||raw;
}

function collectSamples(dataset){
  const out=[];
  for(const day of Object.keys(dataset||{})){
    const clips=dataset[day]||{};
    for(const clipId of Object.keys(clips)){
      const clip=clips[clipId];
      const list=clip?.derivedTargets?.aiShotChoice||[];
      for(const sample of list){
        if(SKILLS.includes(sample.label))out.push(sample);
      }
    }
  }
  return out;
}

function train(samples){
  const counts={};
  for(const sample of samples){
    const key=keyFromSample(sample);
    counts[key]??={};
    counts[key][sample.label]=(counts[key][sample.label]||0)+1;
  }
  const policy={};
  for(const [key,skillCounts] of Object.entries(counts)){
    let bestSkill='bump',bestCount=-1,total=0;
    for(const skill of SKILLS){
      const count=skillCounts[skill]||0;
      total+=count;
      if(count>bestCount){bestCount=count;bestSkill=skill;}
    }
    policy[key]={
      action:bestSkill,
      confidence:total?bestCount/total:0,
      counts:skillCounts
    };
  }
  return{
    version:1,
    trainedAt:new Date().toISOString(),
    samples:samples.length,
    keySpec:['aiTouches','rallyBucket','ballXBucket','ballYBucket','ballVxBucket','ballVyBucket','playerXBucket','playerYBucket','aiAir'],
    policy
  };
}

function main(){
  const dataset=readDataset(path.resolve(inputPath));
  const samples=collectSamples(dataset);
  const model=train(samples);
  fs.writeFileSync(path.resolve(outputPath),JSON.stringify(model,null,2));
  console.log(`Trained shot policy from ${samples.length} samples -> ${outputPath}`);
}

main();
