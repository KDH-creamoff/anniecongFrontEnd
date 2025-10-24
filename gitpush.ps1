param(
  [Parameter(Mandatory=$true)][string]$Branch,
  [Parameter(Mandatory=$true, ValueFromRemainingArguments=$true)][string[]]$MessageParts
)

$Remote = if ($env:REMOTE) { $env:REMOTE } else { "origin" }
$Msg = [string]::Join(" ", $MessageParts)

# 1) Git 저장소 여부
git rev-parse --is-inside-work-tree | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Host "❌ 여기는 Git 저장소가 아닙니다."; exit 1 }

# 2) 원격 최신
git fetch $Remote --prune

# 3) 베이스 브랜치 결정
$defaultBase = (git remote show $Remote | Select-String -Pattern "HEAD branch" | ForEach-Object { ($_ -split ":\s*")[1].Trim() })
if (-not $defaultBase) { $defaultBase = "main" }
$Base = if ($env:BASE) { $env:BASE } else { $defaultBase }

# 4) 브랜치 체크아웃/생성
git show-ref --verify --quiet "refs/heads/$Branch"
if ($LASTEXITCODE -eq 0) {
  git checkout $Branch
} else {
  git ls-remote --exit-code --heads $Remote $Branch *> $null
  if ($LASTEXITCODE -eq 0) {
    git checkout -t "$Remote/$Branch"
  } else {
    git checkout $Base
    git pull --ff-only $Remote $Base
    git checkout -b $Branch
  }
}

# 5) 스테이징 & 커밋
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
  Write-Host "ℹ️ 스테이징된 변경이 없습니다. 빈 커밋 생성"
  git commit --allow-empty -m "$Msg"
} else {
  git commit -m "$Msg"
}

# 6) 푸시
git push -u $Remote $Branch
Write-Host "✅ 푸시 완료: $Remote/$Branch"
