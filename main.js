//no ence mek
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const figlet = require('figlet')
const moment = require('moment-timezone')
const { wait, banner, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions.js')
const { color } = require('./lib/color.js')
const _welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))
const setting = JSON.parse(fs.readFileSync('./setting/setting.json'))

session = setting.session


require('./zets.js')
nocache('./zets.js', module => console.log(`${module} telah di update!`))

const starts = async (marubotz = new WAConnection()) => {
    marubotz.logger.level = 'warn'
    marubotz.version = [2, 2142, 12]
    console.log(color(figlet.textSync('BOT-PLAYSHOP', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('\n> IG : playshop.online.id ','silver'))
console.log(color('> NAMA SERVER: BOT-PLAYSHOP ','silver'))
console.log(color('> WA KAMI: +6285892640252 ','silver'))
console.log(color('  Bot Wangsaff','mediumseagreen'))
    console.log(color('<>','red'), color('Sekarang bot online\nNote, sc ini Free', 'yellow'))
    console.log(color('<>','red'), color('Source Code Version: 3.0.1', 'aqua'))
    console.log(color('<>','red'), color('Bug lapor dek', 'aqua'), color('https://wa.me/6285892640252'))
    console.log(color('[KNTLO BOT]'), color('Dah online nyambung', 'aqua'))
    console.log(color('[DEV]', 'cyan'), color('Welcome Ro My BOT', 'magenta'))
    console.log(color('<>','red'), color('Thanks Dah make', 'white'))
	marubotz.browserDescription = [ 'SERVER-BOT-PLAYSHOP', 'chrome', '3.0' ]
    marubotz.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan qr waktu 20 detik !!'))
    })

    fs.existsSync(`./${session}.json`) && marubotz.loadAuthInfo(`./${session}.json`)
    marubotz.on('connecting', () => {
        start('2', 'Loading ...')
    })
    marubotz.on('open', () => {
        success('2', 'Connected ✓')
    })
        //inform to developer that the user is connected to bot
    marubotz.sendMessage(`6285892640252@s.whatsapp.net`, `selamat datang bot playshop`, MessageType.extendedText)
    
    //group link target
    teks = `https://chat.whatsapp.com/HD9RMy70KuNE46B8ZnskXt`
    marubotz.query({ json:["action", "invite", `${teks.replace('https://chat.whatsapp.com/','')}`]})
    
    await marubotz.connect({timeoutMs: 30*1000})
        fs.writeFileSync(`./${session}.json`, JSON.stringify(marubotz.base64EncodedAuthInfo(), null, '\t'))

    marubotz.on('chat-update', async (message) => {
        require('./zets.js')(marubotz, message, _welkom)
    })
marubotz.on("group-participants-update", async (anu) => {

    const isWelkom = _welkom.includes(anu.jid)
    try {
      groupMet = await marubotz.groupMetadata(anu.jid)
      groupMembers = groupMet.participants
      groupAdmins = getGroupAdmins(groupMembers)
      mem = anu.participants[0]

      console.log(anu)
      try {
        pp_user = await marubotz.getProfilePicture(mem)
      } catch (e) {
        pp_user = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
      }
      try {
        pp_group = await marubotz.getProfilePicture(anu.jid)
      } catch (e) {
        pp_group =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
      }
            if (anu.action == "add" && mem.includes(marubotz.user.jid)) {
        marubotz.sendMessage(anu.jid, "Hallo grup Ini Sudah Di berhasil Di pasangkan bot", "conversation")
      }
      buffer = await getBuffer(pp_user)
      if (anu.action == 'add' && !mem.includes(marubotz.user.jid)) {
      const mdata = await marubotz.groupMetadata(anu.jid)
      const memeg = mdata.participants.length
      const thu = await marubotz.getStatus(anu.participants[0], MessageType.text)
      const num = anu.participants[0]
      const bosco1 = await marubotz.prepareMessage("0@s.whatsapp.net", buffer, MessageType.location,{ thumbnail: buffer})
      const bosco2 = bosco1.message["ephemeralMessage"] ? bosco1.message.ephemeralMessage : bosco1
      let v = marubotz.contacts[num] || { notify: num.replace(/@.+/, '') }
      anu_user = v.vname || v.notify || num.split('@')[0]
      time_welc = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
      time_wel = moment.tz('Asia/Kolkata').format("hh:mm")
      teks = `Hallo @${num.split('@')[0]}\nBio : ${thu.status}\nMember : ${memeg}\nWelcome To ${mdata.subject}\n\nHallo selamat datang di grup.jangan lupa baca dekripsi grup!`
      welcomeBut = [{buttonId:`#menu`,buttonText:{displayText:'Welcome Mek️'},type:1}]
      welcomeButt = { contentText: `${teks}`, footerText: `BOT PLAYSHOP`, buttons: welcomeBut, headerType: 6, locationMessage: bosco2.message.locationMessage}
      marubotz.sendMessage(mdata.id, welcomeButt, MessageType.buttonsMessage, { caption: 'buffer', "contextInfo": { "mentionedJid" : [num], },})
      }
      if (anu.action == 'remove' && !mem.includes(marubotz.user.jid)) {
      const mdata = await marubotz.groupMetadata(anu.jid)
      const num = anu.participants[0]
      const bosco3 = await marubotz.prepareMessage("0@s.whatsapp.net", buffer, MessageType.location,{ thumbnail: buffer})
      const bosco4 = bosco3.message["ephemeralMessage"] ? bosco3.message.ephemeralMessage : bosco3
      let w = marubotz.contacts[num] || { notify: num.replace(/@.+/, '') }
      anu_user = w.vname || w.notify || num.split('@')[0]
      time_welc = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
      time_wel = moment.tz('Asia/Kolkata').format("hh:mm")
      memeg = mdata.participants.length
      out = `Sampai Jumpah @${num.split('@')[0]}\nSemoga sehat selalu`
      goodbyeBut = [{buttonId:`#gbye`,buttonText:{displayText:'BYE 👋'},type:1}]
      goodbyeButt = { contentText: `${out}`, footerText: `BOT PLAYSHOP`, buttons: goodbyeBut, headerType: 6, locationMessage: bosco3.message.locationMessage}
      marubotz.sendMessage(mdata.id, goodbyeButt, MessageType.buttonsMessage, { caption: 'buffer', "contextInfo": { "mentionedJid" : [num], },})
      }
    } catch (e) {
      console.log("Error : %s", color(e, "red"))
    }

  })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'Now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}
/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
