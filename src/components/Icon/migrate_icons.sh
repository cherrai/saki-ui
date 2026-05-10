#!/bin/bash

# 1. 配置路径
SOURCE_FILE="./icon.tsx"
OUTPUT_DIR="./assets"

# 2. 创建输出目录
mkdir -p "$OUTPUT_DIR"

echo "🚀 开始提取图标..."

# 3. 使用 awk 进行多行提取
# 思路：找到包含 '(): => (' 的行开始，直到最近的 '</svg>)' 结束
awk '
/\(\) => \(/ {
    # 提取函数名作为文件名 (去掉冒号)
    match($0, /[a-zA-Z0-9_]+:/);
    name = substr($0, RSTART, RLENGTH - 1);
    in_svg = 1;
    content = "";
}

in_svg {
    # 累加内容
    content = content $0 "\n";
}

/<\/svg>/ {
    if (in_svg) {
        # 清理内容：去掉函数头部的 "Name: () => (" 和 尾部的 ")"
        sub(/^[[:space:]]*[a-zA-Z0-9_]+:[[:space:]]*\(\)[[:space:]]*=>[[:space:]]*\(/, "", content);
        sub(/\)[[:space:]]*,[[:space:]]*$/, "", content);
        sub(/\)[[:space:]]*$/, "", content);
        
        # 移除 JSX 风格的注释 {/* ... */}
        gsub(/\{\/\*.*\*\/\}/, "", content);
        
        # 写入文件
        print content > ("'"$OUTPUT_DIR"'/" name ".svg");
        print "✅ 已生成: " name ".svg";
        
        in_svg = 0;
        content = "";
    }
}
' "$SOURCE_FILE"

echo "🎉 迁移完成！请检查 $OUTPUT_DIR 目录。"