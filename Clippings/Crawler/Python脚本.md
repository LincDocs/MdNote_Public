## 爬虫准备

demo: https://api.bilibili.com/x/polymer/web-space/seasons_archives_list?mid=52374219&season_id=2634613&sort_reverse=false&page_size=30&page_num=1&web_location=333.1387

注意: 该脚本完全由 *Gemini 2.5 Pro* 生成

```python
import requests
import json
import time
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def get_bilibili_collection(season_id: str, mid: str):
    """
    爬取B站指定合集的视频信息并生成 JSON 和 Markdown 文件。
    (版本 2: 增强了网络稳定性和容错能力)

    :param season_id: 合集的 ID (season_id)
    :param mid: UP主的 ID (mid)
    """
    api_url = "https://api.bilibili.com/x/polymer/web-space/seasons_archives_list"
    page_num = 1
    page_size = 30
    all_videos = []

    # --- 改进 1: 使用 Session 对象 ---
    session = requests.Session()

    # --- 改进 2: 增加 Referer 和更通用的 User-Agent ---
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'Referer': f'https://space.bilibili.com/{mid}/channel/collectiondetail?sid={season_id}'
    })

    # --- 改进 3: 设置重试逻辑 ---
    # 定义重试策略：总共重试5次，对连接错误、读取错误进行重试
    # backoff_factor 会让每次重试的等待时间增加 (如 0.5s, 1s, 2s...)
    retry_strategy = Retry(
        total=5,
        status_forcelist=[429, 500, 502, 503, 504],  # 对这些状态码的响应进行重试
        allowed_methods=["HEAD", "GET", "OPTIONS"],
        backoff_factor=1
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("https://", adapter)
    session.mount("http://", adapter)

    print(f"▶️ 开始爬取合集 (season_id: {season_id})... (已启用增强模式)")

    while True:
        params = {
            'mid': mid,
            'season_id': season_id,
            'sort_reverse': 'false',
            'page_num': page_num,
            'page_size': page_size
        }

        try:
            # --- 改进 4: 增加超时设置 (连接5秒，读取10秒) ---
            response = session.get(api_url, params=params, timeout=(5, 10))
            response.raise_for_status()
            data = response.json()

            if data['code'] != 0:
                print(f"❌ API返回错误: {data['message']}")
                break

            archives = data.get('data', {}).get('archives', [])
            if not archives:
                print("✅ 已到达最后一页，爬取完成。")
                break
            
            print(f"📄 正在爬取第 {page_num} 页, 找到 {len(archives)} 个视频...")
            for video in archives:
                all_videos.append({
                    "bvid": video['bvid'],
                    "title": video['title']
                })

            page_num += 1
            time.sleep(0.5) # 保持礼貌性停顿

        except requests.exceptions.RequestException as e:
            # 重试5次后仍然失败，才会打印这个错误
            print(f"❌ 网络请求失败，已达最大重试次数: {e}")
            break
        except json.JSONDecodeError:
            print("❌ 解析JSON响应失败，可能返回的不是有效的JSON。")
            break

    session.close() # 关闭会话

    if not all_videos:
        print("🤷‍♂️ 未爬取到任何视频，脚本结束。")
        return

    print(f"\n✨ 总共爬取到 {len(all_videos)} 个视频。")

    # 保存为 JSON 文件
    json_filename = f"bilibili_collection_{season_id}.json"
    try:
        with open(json_filename, 'w', encoding='utf-8') as f:
            json.dump(all_videos, f, ensure_ascii=False, indent=2)
        print(f"💾 JSON 文件已保存为: {json_filename}")
    except IOError as e:
        print(f"❌ 保存JSON文件失败: {e}")

    # 保存为 Markdown 文件
    md_filename = f"bilibili_collection_{season_id}.md"
    try:
        with open(md_filename, 'w', encoding='utf-8') as f:
            f.write(f"# Bilibili 合集视频列表 (season_id: {season_id})\n\n")
            for video in all_videos:
                title = video['title']
                bvid = video['bvid']
                video_url = f"https://www.bilibili.com/video/{bvid}"
                f.write(f"- [{title}]({video_url})\n")
        print(f"💾 Markdown 文件已保存为: {md_filename}")
    except IOError as e:
        print(f"❌ 保存Markdown文件失败: {e}")

# 以 https://space.bilibili.com/52374219/lists/2634613?type=season 为例
# 这里有目标id和会话id
# 辅助调试: api中搜索: api.bilibili.com/x/polymer/
if __name__ == '__main__':
    # --- 配置区 ---
    TARGET_MID = "52374219"
    TARGET_SEASON_ID = "2634613"
    # --- 配置结束 ---
    
    get_bilibili_collection(season_id=TARGET_SEASON_ID, mid=TARGET_MID)
```
