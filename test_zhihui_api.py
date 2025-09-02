#!/usr/bin/env python3
"""
测试智慧API与LibreChat的兼容性
验证自定义base_url是否工作正常
"""
from openai import OpenAI
import sys
import json

def test_zhihui_api():
    """测试智慧API"""
    print("🧪 测试智慧API连接...")
    
    client = OpenAI(
        api_key="sk-vsMu0iewQGZmdsQJTtgFnofrcdVUxBzqAxsin6uXvKTQ8M4H",
        base_url="https://cc.zhihuiapi.top/v1"
    )
    
    model = "claude-sonnet-4-20250514"
    
    try:
        print(f"📡 正在调用模型: {model}")
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": "你好，世界！请简短回复。"}
            ],
            stream=False,
            max_tokens=100
        )
        
        print("✅ API调用成功!")
        print(f"📝 响应: {response.choices[0].message.content}")
        print(f"🔢 Token使用: {response.usage}")
        
        return True
        
    except Exception as e:
        print(f"❌ API调用失败: {e}")
        return False

def test_models_endpoint():
    """测试模型列表端点"""
    print("\n🔍 测试模型列表端点...")
    
    client = OpenAI(
        api_key="sk-vsMu0iewQGZmdsQJTtgFnofrcdVUxBzqAxsin6uXvKTQ8M4H",
        base_url="https://cc.zhihuiapi.top/v1"
    )
    
    try:
        models = client.models.list()
        print("✅ 模型列表获取成功!")
        print(f"📋 可用模型数量: {len(models.data)}")
        
        for model in models.data[:5]:  # 只显示前5个
            print(f"   - {model.id}")
            
        if len(models.data) > 5:
            print(f"   ... 还有 {len(models.data) - 5} 个模型")
            
        return True
        
    except Exception as e:
        print(f"❌ 模型列表获取失败: {e}")
        return False

def verify_librechat_config():
    """验证LibreChat配置"""
    print("\n🔧 验证LibreChat配置...")
    
    try:
        # 检查librechat.yaml
        try:
            with open('librechat.yaml', 'r', encoding='utf-8') as f:
                content = f.read()
                if 'cc.zhihuiapi.top' in content:
                    print("✅ librechat.yaml 配置正确")
                else:
                    print("⚠️  librechat.yaml 中未找到智慧API配置")
        except FileNotFoundError:
            print("❌ 未找到 librechat.yaml 文件")
            
        # 检查.env
        try:
            with open('.env', 'r') as f:
                content = f.read()
                if 'ZHIHUI_API_KEY=' in content:
                    print("✅ .env 环境变量配置正确")
                else:
                    print("⚠️  .env 中未找到 ZHIHUI_API_KEY")
        except FileNotFoundError:
            print("❌ 未找到 .env 文件")
            
        return True
        
    except Exception as e:
        print(f"❌ 配置检查失败: {e}")
        return False

def main():
    print("🚀 LibreChat 智慧API 集成测试")
    print("=" * 50)
    
    # 测试API连接
    api_test = test_zhihui_api()
    
    # 测试模型列表
    models_test = test_models_endpoint()
    
    # 验证配置
    config_test = verify_librechat_config()
    
    print("\n" + "=" * 50)
    print("📊 测试结果:")
    print(f"   API连接: {'✅' if api_test else '❌'}")
    print(f"   模型列表: {'✅' if models_test else '❌'}")
    print(f"   配置文件: {'✅' if config_test else '❌'}")
    
    if api_test and models_test and config_test:
        print("\n🎉 所有测试通过！LibreChat应该能正常使用智慧API了。")
        print("\n📝 下一步:")
        print("   1. 启动LibreChat: npm run backend:dev 和 npm run frontend:dev")
        print("   2. 在界面中选择'智慧API'端点")
        print("   3. 选择模型'claude-sonnet-4-20250514'")
        print("   4. 开始聊天!")
        return True
    else:
        print("\n⚠️  部分测试失败，请检查配置。")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)