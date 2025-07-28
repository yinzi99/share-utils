module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 自定义规则（可选）
  rules: {
    'type-enum': [
      2,  // 错误级别：2=必须符合
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']  // 允许的提交类型
    ],
    'subject-case': [1, 'always', 'lower-case']  // 描述建议小写
  }
};
