#!/usr/bin/env node

// 设置环境变量的 文件头
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "project name is ",
    },
  ])
  .then((answers) => {
    /**
     * Use user feedback for... whatever!!
     * console.log(answers);
     * answers = { name: '' }
     */

    // 模板目录
    const tmlDir = path.join(__dirname, "templates");
    // 目标目录
    const destDir = process.cwd();
    // 读取模板文件,将模板下的文件全部转换到目标目录
    fs.readdir(tmlDir, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        // console.log(file);
        // 通过模板引擎渲染文件
        ejs.renderFile(path.join(tmlDir, file), answers, (error, result) => {
          if (error) throw error;
          // console.log(result)
          // 将结果写入模板
          fs.writeFileSync(path.join(destDir, file), result);
        });
      });
    });
  })
  .catch((error) => {
    // Something else went wrong
    throw error;
  });