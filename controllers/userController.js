const userModel = require('../models/userModel');
const formidable = require('formidable');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

exports.index = async (req, res, next) => {
    // Get from model
    user = res.locals.user;
    // Pass data to view to display
    res.render('user/user', { user });
};

exports.edit = async (req, res, next) => {
    // Get from model

    const form = formidable({ multiples: true });
    let m_files;
    const formfields = await new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
            if (err) {
                reject(err);
                return;
            }
            console.log("within form.parse method, subject field of fields object is: " + fields);
            m_files = files;
            resolve(fields);
        }); // form.parse
    });

    const coverImage = m_files.coverImage;
    const imageName = formfields.name.replace(/ +/g, "") + "coverImg.jpg";

    if (coverImage && coverImage.size > 0) {
        const oldPath = coverImage.path;
        const newPath = __dirname + '/../public/images/' + imageName;
        const rawData = fs.readFileSync(oldPath);
        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log("write file error:",err)
        })
    }
    let flag = 0;

    if (coverImage && coverImage.size > 0) {
        await cloudinary.uploader.upload(__dirname + '/../public/images/' + imageName, { public_id: formfields.name.replace(/ +/g, "") + "coverImg", folder: 'GameStore/Users', unique_filename: false, overwrite: true, "width": 265, "height": 265 })
            .then(function (image) {
                console.log("** File Upload (Promise)");
                console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
                console.log("* " + image.public_id);
                console.log("* " + image.url);
                formfields.cover = image.url;
                console.log("*formfields", formfields);
                flag = 1;
            })
            .catch(function (err) {
                console.log();
                console.log("*** File Upload (Promise)");
                console.log("*formfields", formfields);
                flag = 1;
                if (err) { console.warn(err); }
            });
    }

    if (flag != 0) {
        await userModel.updateuserById(res.locals.user._id, { name: formfields.name, birthday: formfields.birthday, phone: formfields.phone, email: formfields.email, cover: formfields.cover });
    }
    else {
        await userModel.updateuserById(res.locals.user._id, { name: formfields.name, birthday: formfields.birthday, phone: formfields.phone, email: formfields.email });
    }

    const user = await userModel.getonebyname(formfields.name);
    res.render('user/user', { user });

};

