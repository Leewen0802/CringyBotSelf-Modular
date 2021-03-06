/*
         © Copyright Adam Aharony (a.k.a. Cringy Adam)
                    All rights reserved
       Twitter: @AdamAharony, Discord: @Cringy Adam#4611
*/

const exec = require('child_process').exec;
exports.run = async (client, message, args) => {
    let command = args.join(" ");
    console.log(`Running ${command}`);
  
    let runningMessage = [
        "`RUNNING`",
        "```xl",
        clean(command),
        "```",
    ];
    const outMessage = await message.channel.send(runningMessage);
    let stdOut = await doExec(command).catch(data=> outputErr(outMessage, data));
    stdOut = stdOut.substring(0, 1750);
    outMessage.edit(`\`OUTPUT\`\n\`\`\`${clean(stdOut)}\`\`\``);
    };

    const outputErr = (message, stdData) => {
        let { stdout, stderr } = stdData;
        stderr = stderr ? ["`STDERR`","```sh",clean(stderr.substring(0, 800)) || " ","```"] : [];
        stdout = stdout ? ["`STDOUT`","```sh",clean(stdout.substring(0, stderr ? stderr.length : 2046 - 40)) || " ","```"] : [];
        let msg = stdout.concat(stderr).join("\n").substring(0, 2000);
        message.edit(msg);
    };

    const doExec = (cmd, opts = {}) => {
        return new Promise((resolve, reject) => {
            exec(cmd, opts, (err, stdout, stderr) => {
            if (err) return reject({ stdout, stderr });
            resolve(stdout);
            });
        });
    };

    const clean = (text) => {
        if (typeof text === "string") {
            return text.replace("``", `\`${String.fromCharCode(8203)}\``);
        } else {
            return text;
        }
    }; 
