const map = new Map();

/**
 * 
 * @param {Buffer} input 
 */
const day23_1 = (input) => {
    const connections = input.toString().split('\r\n').map((x) => x.split('-'));
    
    connections.forEach((c) => {
        const g1 = map.get(c[0]);
        const g2 = map.get(c[1]);

        if (g1) g1.push(c[1])
        else map.set(c[0], [c[1]])

        if (g2) g2.push(c[0])
        else map.set(c[1], [c[0]])
    });

    const parties = new Map();
    // 'kh' => [ 'tc', 'qp', 'ub', 'ta' ]
    //  k         i     j
    // basically check every combination of [k,i,j]
    // and see if key i,j contain k,j, and k,i respectively
    map.forEach((v,k) => {
        for (let i = 0; i<v.length-1;i++){
            for (let j = 1;j<v.length;j++){
                const party = [k,v[i],v[j]];
                if (map.get(party[1]).includes(party[0]) && map.get(party[1]).includes(party[2])
                    && map.get(party[2]).includes(party[0]) && map.get(party[2]).includes(party[1])) {
                    const key = party.toSorted().join('');
                    parties.set(key, party);
                }
            }
        }
    });

    let total = 0;
    parties.forEach((v, k) => {
        for (let i = 0; i < v.length; i++) {
            if (v[i].startsWith('t')) {
                total++;
                break;
            }
        }
    });

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day23_2 = (_input) => {
    // console.log(map.size);
    let total = 0;

    console.log(`Answer: ${total}`);
};

/**
 * 
 * @param {Buffer} input 
 */
const day23 = (input) => {
    day23_1(input);
    day23_2(input);
};

module.exports = {
    day23
};
