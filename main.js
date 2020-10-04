var S = [undefined];
var optimized = [{}];

var f1 = [0, 6, 10, 15, 26, 28, 38, 45, 49];
var f2 = [0, 8, 12, 20, 28, 35, 40, 46, 48];

var c1 = x => 0.6 * x;
var c2 = x => 0.2 * x;

var xtof = x => Math.max((x / 50 >> 0), 0);
var roud = x => x - (x % 50);
var max  = array => {
    var max = array[0];
    array.forEach(item => max = Math.max(item, max));
    return max;
}

S[0] = xn => ({value: 0, total: xn});

for(let i = 1; i < 4; i++)
{
    S.push(undefined);
    optimized.push({});

    S[i] = x => {
        if(optimized[i][x] === undefined)
        {
            var res = (u1, u2) => f1[xtof(u1)] + f2[xtof(u2)] + S[i - 1](x - u1 - u2 + c1(u1) + c2(u2)).value;

            var max_val = res(0, roud(x));
            var step_u1 = 0;
            var step_u2 = roud(x);
            
            for(var step = 50; step < x; step += 50)
            {   
                let record = res(roud(step), roud(x - step));
                if (record > max_val)
                {
                    max_val = record;
                    step_u1 = step;
                    step_u2 = roud(x - step);
                }
            }
    
            optimized[i][(() => x)()] = {value : max_val, step_u1, step_u2};
        }
        
        return optimized[i][x];
    };

}
S[1](50)
S[1](100)

var node = {step_u1:400};
for(var i = 3; i >= 0; i--)
{
    console.log(node)
    node = S[i](node.step_u1);
}