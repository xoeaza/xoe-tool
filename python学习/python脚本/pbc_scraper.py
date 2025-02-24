from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import os
import time
import requests
from urllib.parse import urljoin
import logging

# 设置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def setup_chrome():
    """设置并启动Chrome浏览器"""
    try:
        chrome_options = Options()
        chrome_options.add_argument('--start-maximized')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--ignore-certificate-errors')
        chrome_options.add_argument('--ignore-ssl-errors')
        
        # 设置下载选项
        prefs = {
            "download.default_directory": os.path.abspath("pbc_data"),
            "download.prompt_for_download": False,
            "download.directory_upgrade": True,
            "safebrowsing.enabled": True
        }
        chrome_options.add_experimental_option("prefs", prefs)
        
        # 使用ChromeDriverManager自动管理ChromeDriver
        service = Service(ChromeDriverManager().install())
        
        # 创建Chrome浏览器实例
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        # 设置页面加载超时时间
        driver.set_page_load_timeout(30)
        driver.implicitly_wait(5)
        
        logger.info("正在启动Chrome浏览器...")
        logger.info("成功启动Chrome浏览器")
        return driver
    except Exception as e:
        logger.error(f"启动Chrome浏览器失败: {str(e)}")
        raise

def save_text_content(title, content, output_dir):
    """保存文本内容到文件"""
    try:
        filename = f"{title}.txt"
        filename = "".join(char for char in filename if char.isalnum() or char in (' ', '-', '_')).rstrip()
        filepath = os.path.join(output_dir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        logger.info(f"已保存文本内容到: {filepath}")
        return filepath
    except Exception as e:
        logger.error(f"保存文本内容失败: {str(e)}")
        return None

def download_file(url, title, output_dir):
    """下载文件"""
    try:
        logger.info(f"正在下载文件: {url}")
        response = requests.get(url, stream=True, timeout=10, verify=False)
        if response.status_code == 200:
            content_type = response.headers.get('Content-Type', '')
            if 'pdf' in content_type.lower() or url.lower().endswith('.pdf'):
                ext = '.pdf'
            else:
                ext = '.txt'
            
            filename = f"{title}{ext}"
            filename = "".join(char for char in filename if char.isalnum() or char in (' ', '-', '_')).rstrip()
            filepath = os.path.join(output_dir, filename)
            
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
            logger.info(f"文件下载成功: {filepath}")
            return filepath
    except Exception as e:
        logger.error(f"下载文件失败: {url}, 错误: {str(e)}")
    return None

def save_search_results(driver, output_dir, page_num=1):
    """保存搜索结果页面的数据到文件"""
    try:
        # 等待搜索结果加载
        WebDriverWait(driver, 3).until(
            EC.all_of(
                EC.presence_of_element_located((By.CLASS_NAME, "default-result-list")),
                EC.presence_of_element_located((By.CSS_SELECTOR, "div.news-style1"))
            )
        )
        logger.info(f"第 {page_num} 页搜索结果已加载完成")
        
        # 获取所有搜索结果项
        results = driver.find_elements(By.CSS_SELECTOR, "div.news-style1")
        
        if not results:
            logger.warning(f"第 {page_num} 页没有找到搜索结果")
            return False
            
        logger.info(f"第 {page_num} 页找到 {len(results)} 个搜索结果")
        
        # 追加搜索结果到文件
        with open(os.path.join(output_dir, "search_results.txt"), "a", encoding="utf-8") as f:
            f.write(f"\n=== 第 {page_num} 页 ===\n\n")
            for i, result in enumerate(results, 1):
                try:
                    # 获取标题和链接
                    title_element = result.find_element(By.CSS_SELECTOR, "h3 a")
                    title = title_element.text.strip()
                    link = title_element.get_attribute('href')
                    
                    # 获取日期
                    try:
                        date_element = result.find_element(By.CSS_SELECTOR, "p.dates span:not(.date_)")
                        date = date_element.text.strip()
                    except:
                        date = "未知日期"
                    
                    # 获取描述
                    try:
                        desc_element = result.find_element(By.CSS_SELECTOR, "p.txtCon")
                        desc = desc_element.text.strip()
                    except:
                        desc = ""
                    
                    # 写入文件
                    f.write(f"{i}. {title}\n")
                    f.write(f"   发布日期: {date}\n")
                    f.write(f"   链接: {link}\n")
                    if desc:
                        f.write(f"   描述: {desc}\n")
                    f.write("\n")
                    
                except Exception as e:
                    logger.error(f"处理第 {page_num} 页第 {i} 个搜索结果时出错: {str(e)}")
                    continue
        
        return True
    except Exception as e:
        logger.error(f"保存第 {page_num} 页搜索结果时出错: {str(e)}")
        return False

def process_detail_pages(output_dir):
    """处理所有详情页"""
    driver = None
    try:
        driver = setup_chrome()
        
        # 读取搜索结果文件
        with open(os.path.join(output_dir, "search_results.txt"), "r", encoding="utf-8") as f:
            content = f.read()
        
        # 提取所有链接
        import re
        links = re.findall(r"链接: (http[^\n]+)", content)
        total_links = len(links)
        logger.info(f"共找到 {total_links} 个链接待处理")
        
        # 处理每个详情页
        for i, link in enumerate(links, 1):
            try:
                logger.info(f"正在处理第 {i}/{total_links} 个链接: {link}")
                
                driver.get(link)
                
                # 获取标题和日期
                title = driver.title.strip()
                try:
                    date = driver.find_element(By.CSS_SELECTOR, "p.dates span:not(.date_)").text.strip()
                except:
                    date = "未知日期"
                
                # 获取正文内容
                try:
                    content_element = WebDriverWait(driver, 2).until(
                        EC.presence_of_element_located((By.CSS_SELECTOR, "div#zoom"))
                    )
                    content = content_element.text
                    
                    # 保存正文内容
                    content_filename = f"{title}_{date}.txt"
                    content_filename = "".join(char for char in content_filename if char.isalnum() or char in (' ', '-', '_', '.')).rstrip()
                    content_path = os.path.join(output_dir, content_filename)
                    with open(content_path, 'w', encoding='utf-8') as cf:
                        cf.write(content)
                    logger.info(f"已保存文章内容: {content_filename}")
                
                except Exception as e:
                    logger.error(f"获取文章内容失败: {str(e)}")
                
                # 下载PDF附件
                try:
                    attachments = driver.find_elements(By.CSS_SELECTOR, "a[href$='.pdf'], a[href*='.pdf']")
                    if attachments:
                        for attachment in attachments:
                            file_url = attachment.get_attribute('href')
                            if file_url:
                                download_file(file_url, f"{title}_{date}", output_dir)
                except Exception as e:
                    logger.error(f"下载附件失败: {str(e)}")
                
                time.sleep(1)  # 避免请求过于频繁
                
            except Exception as e:
                logger.error(f"处理详情页失败: {str(e)}")
                continue
            
    except Exception as e:
        logger.error(f"处理详情页时发生错误: {str(e)}")
    
    finally:
        if driver:
            driver.quit()

def get_total_pages(driver):
    """获取总页数"""
    try:
        total_pages_element = driver.find_element(By.ID, "default-result-total-pages")
        return int(total_pages_element.get_attribute("value"))
    except Exception as e:
        logger.error(f"获取总页数时出错: {str(e)}")
        return 0

def go_to_page(driver, page_num):
    """跳转到指定页面"""
    try:
        # 找到分页链接并点击
        page_links = driver.find_elements(By.CSS_SELECTOR, "#default-result-paging li[jp-role='page']")
        for link in page_links:
            if link.get_attribute("jp-data") == str(page_num):
                link.find_element(By.TAG_NAME, "a").click()
                time.sleep(2)  # 等待页面加载
                return True
                
        # 如果在可见页码中没找到目标页码，尝试使用下一页按钮
        next_button = driver.find_element(By.CSS_SELECTOR, "li[jp-role='next'] a")
        next_button.click()
        time.sleep(2)  # 等待页面加载
        return True
    except Exception as e:
        logger.error(f"跳转到第 {page_num} 页时出错: {str(e)}")
        return False

def main():
    # 创建输出目录
    output_dir = "pbc_data"
    os.makedirs(output_dir, exist_ok=True)
    logger.info(f"创建输出目录: {output_dir}")
    
    # 第一阶段：获取所有搜索结果
    driver = None
    try:
        driver = setup_chrome()
        
        # 访问人民银行网站
        base_url = "http://www.pbc.gov.cn/"
        driver.get(base_url)
        logger.info("已访问人民银行网站首页")
        
        # 等待页面加载完成
        logger.info("等待页面加载完成...")
        try:
            # 增加搜索框和按钮的等待时间
            WebDriverWait(driver, 5).until(
                EC.all_of(
                    EC.presence_of_element_located((By.ID, "q")),
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))
                )
            )
            
            # 获取搜索框和按钮
            search_box = driver.find_element(By.ID, "q")
            search_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            logger.info("搜索框和按钮已加载完成")
            
            # 输入搜索关键词
            search_box.clear()
            search_box.send_keys("金融机构贷款投向")
            logger.info("已输入搜索关键词")
            
            # 点击搜索按钮
            search_button.click()
            logger.info("已点击搜索按钮")
            
            # 点击搜索按钮后等待
            time.sleep(1)
            
            # 检查并处理新窗口
            if len(driver.window_handles) > 1:
                logger.info(f"检测到多个窗口: {len(driver.window_handles)} 个")
                # 保存当前窗口句柄
                original_window = driver.current_window_handle
                
                # 切换到新窗口
                for window_handle in driver.window_handles:
                    if window_handle != original_window:
                        driver.switch_to.window(window_handle)
                        logger.info("切换到搜索结果页面")
                        break
                
                # 关闭其他窗口，但保留当前窗口
                current_window = driver.current_window_handle
                for window_handle in driver.window_handles:
                    if window_handle != current_window:
                        driver.switch_to.window(window_handle)
                        driver.close()
                        logger.info(f"关闭窗口: {window_handle}")
                
                # 切回当前窗口
                driver.switch_to.window(current_window)
                logger.info("切回搜索结果页面")
            
            # 清空搜索结果文件
            with open(os.path.join(output_dir, "search_results.txt"), "w", encoding="utf-8") as f:
                f.write("搜索结果列表\n\n")
            
            # 获取总页数并遍历每一页
            total_pages = get_total_pages(driver)
            logger.info(f"总页数: {total_pages}")
            
            current_page = 1
            while current_page <= total_pages:
                logger.info(f"开始获取第 {current_page} 页搜索结果")
                
                if current_page > 1:
                    if not go_to_page(driver, current_page):
                        break
                
                if not save_search_results(driver, output_dir, current_page):
                    break
                    
                current_page += 1
            
        except Exception as e:
            logger.error(f"搜索操作失败: {str(e)}")
            logger.info("页面源码:")
            logger.info(driver.page_source)
            raise
        
    except Exception as e:
        logger.error(f"发生错误: {str(e)}")
    
    finally:
        logger.info("脚本执行完成")
        if driver:
            driver.quit()
    
    # 第二阶段：处理详情页
    logger.info("开始处理详情页")
    process_detail_pages(output_dir)
    
    logger.info("全部爬取完成")

if __name__ == "__main__":
    main()
