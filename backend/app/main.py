from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Rebbit Hole API",
    description="Backend for the Rebbit Hole game launcher ecosystem.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Rebbit Hole API is running."}


@app.get("/health")
def health():
    return {"status": "ok"}

# TODO: mount routers as they are built
# from app.routers import games, patches, rewards
# app.include_router(games.router, prefix="/games", tags=["games"])
# app.include_router(patches.router, prefix="/patches", tags=["patches"])
# app.include_router(rewards.router, prefix="/rewards", tags=["rewards"])
