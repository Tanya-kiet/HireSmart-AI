"""
Recruiter Analytics API Router for HireSmart AI.
"""

from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.schemas.analytics import (
    AnalyticsOverviewResponse,
    FunnelStageItem,
    SkillDemandItem,
    CategoryDistributionItem,
    MonthlyTrendItem,
)
from backend.app.services.analytics_service import get_recruiter_analytics
from backend.app.core.security import require_roles

router = APIRouter(
    prefix="/api/v1/analytics",
    tags=["Recruiter Analytics & Reports"],
)


@router.get(
    "/overview",
    response_model=AnalyticsOverviewResponse,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def get_analytics_overview(db: Session = Depends(get_db)):
    """
    Retrieve complete Recruiter Analytics overview (KPIs, Funnel, Skill Demand, Trends).
    """
    return get_recruiter_analytics(db)


@router.get(
    "/funnel",
    response_model=List[FunnelStageItem],
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def get_hiring_funnel(db: Session = Depends(get_db)):
    """
    Retrieve Hiring Funnel stage conversion rates.
    """
    analytics = get_recruiter_analytics(db)
    return analytics["hiring_funnel"]


@router.get(
    "/skill-demand",
    response_model=List[SkillDemandItem],
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def get_skill_demand(db: Session = Depends(get_db)):
    """
    Retrieve top technical skill demand aggregation.
    """
    analytics = get_recruiter_analytics(db)
    return analytics["skill_demand"]


@router.get(
    "/category-distribution",
    response_model=List[CategoryDistributionItem],
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def get_category_distribution(db: Session = Depends(get_db)):
    """
    Retrieve Candidate job domain category distribution.
    """
    analytics = get_recruiter_analytics(db)
    return analytics["category_distribution"]


@router.get(
    "/hiring-trend",
    response_model=List[MonthlyTrendItem],
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def get_hiring_trends(db: Session = Depends(get_db)):
    """
    Retrieve Monthly resume uploads, interviews, and hiring trends.
    """
    analytics = get_recruiter_analytics(db)
    return analytics["monthly_trends"]
