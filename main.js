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
        }
    }
}

pAequor = pAequorFactory(1, mockUpStrand());
console.log(pAequor);
pAequor.mutate();
console.log(pAequor); // one of the 16 base should be different than previously

pAequor2 = pAequorFactory(2, mockUpStrand());
console.log(pAequor2);
pAequor.compareDNA(pAequor2);