import os
from apscheduler.schedulers.background import BackgroundScheduler
from services.g2b_scraper_service import g2b_scraper
import atexit

def start_scheduler():
    scheduler = BackgroundScheduler(daemon=True)
    
    # 환경변수에서 간격 가져오기 (기본값: 1시간 = 3600초)
    interval = int(os.environ.get("G2B_COLLECT_INTERVAL_SECONDS", 3600))
    lookback = int(os.environ.get("G2B_LOOKBACK_HOURS", 2))
    
    # 정기 실행 잡 등록
    scheduler.add_job(func=lambda: g2b_scraper.fetch_and_store_notices(hours_back=lookback), trigger="interval", seconds=interval)
    scheduler.start()
    
    # 서버 종료 시 스케줄러 종료
    atexit.register(lambda: scheduler.shutdown())
    
    print(f"[Scheduler] Started. Will fetch G2B data every {interval} seconds.")
    
    # 서버 구동 시 최초 1회 실행 설정 (환경변수 확인)
    if os.environ.get("G2B_COLLECT_RUN_ON_START", "true").lower() == "true":
        print("[Scheduler] Running initial data fetch...")
        scheduler.add_job(func=lambda: g2b_scraper.fetch_and_store_notices(hours_back=lookback))
