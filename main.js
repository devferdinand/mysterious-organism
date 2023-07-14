// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand;
}


const pAequorFactory = (num, arr) => {
    return {
        specimenNum : num,
        dna : arr,

        mutate(){
            // select a random base in object dna
            const indexBaseToMutate = Math.floor(Math.random() * 15);
            const dnaBases = ['A', 'T', 'C', 'G'];
            const baseValue = this.dna[indexBaseToMutate];
            const baseToSelectFrom = dnaBases.filter(e => e !== baseValue);
            // mutate original base to a different one randomly
            this.dna[indexBaseToMutate] = baseToSelectFrom[Math.floor(Math.random() * 3)];
        },

        compareDNA(object){
            let similar = 0;
            let percentages;
            for(let i = 0; i < 15; i++){
                if(this.dna[i] === object.dna[i]){
                    similar++;
                }
            }
            percentages = (similar/15) * 100;
            console.log(`specimen #${this.specimenNum} and specimen #${object.specimenNum} have ${percentages}% DNA in common`);
        },

        willLikelySurvive(){
            // true if object dna contains at least 60% 'C' or 'G' bases
            const arr = this.dna.filter(e => e === 'C' || e === 'G');
            let percentages = (arr.length/15) * 100;
            return percentages >= 60 ? true : false;
        }
    }
}

pAequor1 = pAequorFactory(1, mockUpStrand());
console.log(`printing specimen #${pAequor1.specimenNum}`);
console.log(pAequor1);
console.log(`testing mutate function on specimen #${pAequor1.specimenNum}`);
pAequor1.mutate();
console.log(pAequor1); // one of the 16 base should be different than previously

pAequor2 = pAequorFactory(2, mockUpStrand());
console.log(`printing specimen #${pAequor2.specimenNum}`);
console.log(pAequor2);
console.log(`testing compareDNA function on specimen #${pAequor1.specimenNum} and specimen #${pAequor2.specimenNum}`);
pAequor1.compareDNA(pAequor2);
console.log(`testing willLikelySurvive function on specimen #${pAequor2.specimenNum}`);
console.log(pAequor2.willLikelySurvive()); // returns true if pAequor2 contains 60% 'C' or 'G' bases

// create 30 instances of pAequor that can survive
const pAequorArr = [];
let instancesCount = 0;
const startingSpecimenNum = 3;
while(instancesCount !== 30){
    pAequorX = pAequorFactory(startingSpecimenNum + instancesCount, mockUpStrand());
    if(pAequorX.willLikelySurvive()){
        pAequorArr.push(pAequorX);
        instancesCount++;
    }
}
console.log('30 pAequor specimen for scientific study');
console.log(pAequorArr);

// testing all 30 pAequor can survive
console.log('testing all 30 pAequor specimen can survive');
for(let i = 0; i < pAequorArr.length; i++){
    console.log(`specimen #${pAequorArr[i].specimenNum} can survive in their natural environment: ${pAequorArr[i].willLikelySurvive()}`);
}