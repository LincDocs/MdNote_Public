# .pylintrc

基本同 eslintrc，可以忽略部分错误的检查

## 原检查方式

```bash
pip install pylint
pylint $(git ls-files '*.py')
```

## 选项

例如：

```ini
[MESSAGES CONTROL]
disable=missing-module-docstring,missing-function-docstring
```
